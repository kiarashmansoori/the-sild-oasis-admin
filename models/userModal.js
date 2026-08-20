import mongoose, { model, models, Schema } from "mongoose";

const UserModel = new Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerify: {
    type: Boolean,
  },
  avatar: {
    type: String,
  },
});

const User = models.users || model("users", UserModel);

export default User;
