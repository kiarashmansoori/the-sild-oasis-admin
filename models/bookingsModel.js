import mongoose, { model, models, Schema } from "mongoose";

const bookingsModel = new Schema(
  {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    numNights: {
      type: Number,
    },
    numGuests: {
      type: Number,
    },
    cabinPrice: {
      type: Number,
    },
    extrasPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["unconfirmed", "checkedIn", "checkedOut"],
      default: "unconfirmed",
    },
    hasBreakfast: {
      type: Boolean,
    },
    isPaid: {
      type: Boolean,
    },
    observation: {
      type: String,
    },
    cabinId: {
      type: Schema.Types.ObjectId,
      ref: "cabins",
    },
    guestsId: {
      type: Schema.Types.ObjectId,
      ref: "guests",
    },
  },
  { timestamps: true },
);

const bookings = models.bookings || model("bookings", bookingsModel);

export default bookings;
