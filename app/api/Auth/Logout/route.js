import { returnFunction } from "@/utils/returnFunction";
import { NextResponse } from "next/server";

export async function POST(params) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "loaOut successfuly",
      },
      { status: 200 },
    );
    const cookieOption = {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };
    response.cookies.delete("accessToken", cookieOption);
    response.cookies.delete("refreshToken", cookieOption);
    return response;
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
