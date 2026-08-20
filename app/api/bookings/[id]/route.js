import bookings from "@/models/bookingsModel";
import connectDb from "@/services/connectDb";
import cabins from "@/models/cabinsModal";
import guests from "@/models/guestsModel";
import { returnFunction } from "@/utils/returnFunction";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const booking = await bookings
      .findById(id)
      .populate("cabinId", "name")
      .populate("guestsId", "fullName email  countryFlag nationalId");
    console.log(booking);
    return NextResponse.json(booking);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
export async function PATCH(req, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const body = await req.json();
    const booking = await bookings.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(booking);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
export async function DELETE(req, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const deleteing = await bookings.findByIdAndDelete(id);
    return NextResponse.json(deleteing);
  } catch (error) {
    console.log(error);
    return returnFunction(false, "SERVER ERROR", 500);
  }
}
