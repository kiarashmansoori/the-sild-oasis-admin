import User from "@/models/userModal";
import connectDb from "@/services/connectDb";
import { returnFunction } from "@/utils/returnFunction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();
    const data = await req.json();
    if (!data) {
      return returnFunction(false, "data is reqiured ", 400);
    }
    const user = await User.create(data);

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}

export async function PATCH(req) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      return returnFunction(false, "Please Login", 401);
    }
    const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    await connectDb();
    const password = await req.json();
    const user = await User.findByIdAndUpdate(
      userId,
      { password },
      { new: true },
    );
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
