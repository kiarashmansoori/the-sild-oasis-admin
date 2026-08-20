import { NextResponse } from "next/server";
import { getToday } from "@/utils/helpers";
import bookings from "@/models/bookingsModel";
import connectDb from "@/services/connectDb";
import guests from "@/models/guestsModel";

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);

    const date = searchParams.get("last");

    const stays = await bookings
      .find({
        startDate: {
          $gte: new Date(date),
          $lte: new Date(getToday({ end: true })),
        },
      })
      .populate("guestsId", "fullName");

    return NextResponse.json(stays, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Bookings could not get loaded" },
      { status: 500 },
    );
  }
}
