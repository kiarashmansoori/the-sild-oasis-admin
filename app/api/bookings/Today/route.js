import bookings from "@/models/bookingsModel";
import connectDb from "@/services/connectDb";
import { returnFunction } from "@/utils/returnFunction";
import cabins from "@/models/cabinsModal";
import guests from "@/models/guestsModel";
import { NextResponse } from "next/server";
import { isToday } from "date-fns";

export async function GET(req) {
  try {
    await connectDb();
    const bookingsDataS = await bookings
      .find()
      .populate("cabinId", "name")
      .populate("guestsId", "fullName email countryFlag");

    const unconfirmed = bookingsDataS.filter(
      (booking) =>
        booking.status === "unconfirmed" &&
        isToday(new Date(booking.startDate)),
    );
    const checkedIn = bookingsDataS.filter(
      (booking) =>
        booking.status === "checkedIn" && isToday(new Date(booking.endDate)),
    );

    const bookingsData = [...unconfirmed, ...checkedIn];
    return NextResponse.json(bookingsData);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
