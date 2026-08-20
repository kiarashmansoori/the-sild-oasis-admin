import bookings from "@/models/bookingsModel";
import connectDb from "@/services/connectDb";
import { returnFunction } from "@/utils/returnFunction";
import cabins from "@/models/cabinsModal";
import guests from "@/models/guestsModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    const bookingsData = await bookings
      .find()
      .populate("cabinId", "name")
      .populate("guestsId", "fullName email");
    return NextResponse.json(bookingsData);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
