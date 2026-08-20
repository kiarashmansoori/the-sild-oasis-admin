import settings from "@/models/settingsModel";
import connectDb from "@/services/connectDb";
import { returnFunction } from "@/utils/returnFunction";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    const setting = await settings.find();
    return NextResponse.json(setting);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
