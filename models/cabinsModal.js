import { model, models, Schema } from "mongoose";

const cabinsModel = new Schema({
  name: {
    type: String,
  },
  maxCapacity: {
    type: Number,
  },
  reqularprice: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const cabins = models.cabins || model("cabins", cabinsModel);

export default cabins;
