import { model, models, Schema } from "mongoose";

const settingsModel = new Schema({
  minBookingLength: {
    type: Number,
  },
  maxBookingLength: {
    type: Number,
  },
  maxGuestsPerBooking: {
    type: Number,
  },

  breakfastPrice: {
    type: Number,
  },
});

const settings = models.settings || model("settings", settingsModel);

export default settings;
