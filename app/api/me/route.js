import { returnFunction } from "@/utils/returnFunction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDb from "@/services/connectDb";
import User from "@/models/userModal";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const cookiStore = await cookies();
    const accessToken = cookiStore.get("accessToken")?.value;
    if (!accessToken) {
      return returnFunction(false, "accesstoken is expired", 400);
    }
    let userId;
    if (accessToken) {
      try {
        const payload = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET,
        );
        userId = payload.userId;
      } catch (error) {
        return returnFunction(false, "accessToken is invalid", 401);
      }
    }
    await connectDb();

    const user = await User.findById(userId);

    if (!user) {
      return returnFunction(false, "user not found", 404);
    }
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
