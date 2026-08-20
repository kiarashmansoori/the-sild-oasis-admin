import mongoose from "mongoose";

export default async function connectDb() {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.URL_MONGO);
    console.log("connect db succesfuly ✅");
  } catch (error) {
    console.log(error);
  }
}
