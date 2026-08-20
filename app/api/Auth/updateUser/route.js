import connectDb from "@/services/connectDb";
import path from "path";
import jwt from "jsonwebtoken";
import { writeFile, mkdir } from "fs/promises";
import User from "@/models/userModal";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { returnFunction } from "@/utils/returnFunction";

export async function PUT(req) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      return returnFunction(false, "Please Login", 401);
    }
    const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(userId);
    await connectDb();
    const formdata = await req.formData();
    const fullName = formdata.get("fullName");
    const image = formdata.get("avatar");

    //upload image

    let imageUrl = user.avatar;

    if (image && image instanceof File && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(image.name)}`;

      const uploadDir = path.join(process.cwd(), "public", "images", "users");
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      imageUrl = `/images/users/${fileName}`;
    } else {
      imageUrl = image;
    }

    user.fullName = fullName;
    user.avatar = imageUrl;
    await user.save();
    return NextResponse.json({ message: "user update Successfuly" });
  } catch (error) {
    console.log(error);
  }
}
