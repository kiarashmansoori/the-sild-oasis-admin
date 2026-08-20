import { model, models, Schema } from "mongoose";

const guestsModel = new Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  nationality: {
    type: String,
  },
  countryFlag: {
    type: String,
  },
  nationalId: {
    type: Number,
  },
});

const guests = models.guests || model("guests", guestsModel);

export default guests;
