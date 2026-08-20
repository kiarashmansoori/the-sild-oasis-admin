import { NextResponse } from "next/server";

import { getToday } from "@/utils/helpers";
import bookings from "@/models/bookingsModel";
import connectDb from "@/services/connectDb";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("last");
    if (!date) {
      return NextResponse.json(
        { message: "Date is required" },
        { status: 400 },
      );
    }

    const bookingsData = await bookings
      .find({
        createdAt: {
          $gte: new Date(date),
          $lte: new Date(getToday({ end: true })),
        },
      })
      .select("createdAt totalPrice extrasPrice");

    return NextResponse.json(bookingsData, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Bookings could not get loaded" },
      { status: 500 },
    );
  }
}
