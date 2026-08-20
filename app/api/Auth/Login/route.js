import User from "@/models/userModal";
import connectDb from "@/services/connectDb";
import { returnFunction } from "@/utils/returnFunction";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return returnFunction(false, "email or password is require", 400);
    }

    await connectDb();
    const user = await User.findOne({ email, password });
    if (!user) {
      return returnFunction(false, "email or password invalid", 404);
    }

    const accessPayload = {
      userId: user._id,
      email: user.email,
      isVerify: user.isVerify,
    };

    const accessToken = jwt.sign(
      accessPayload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" },
    );
    const refreshToken = jwt.sign(
      accessPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7day" },
    );
    user.isVerify = true;
    await user.save();

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60,
      sameSite: "strict",
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "strict",
      // secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Login successfuly",
        isVerify: user.isVerify,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
