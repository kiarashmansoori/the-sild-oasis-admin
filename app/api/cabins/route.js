import cabins from "@/models/cabinsModal";
import connectDb from "@/services/connectDb";
import { returnFunction } from "@/utils/returnFunction";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDb();
  const cabinsInfo = await cabins.find();
  return NextResponse.json(cabinsInfo);
}

export async function POST(req) {
  try {
    await connectDb();

    const formdata = await req.formData();

    const name = formdata.get("name");
    const maxCapacity = formdata.get("maxCapacity");
    const reqularprice = formdata.get("reqularprice");
    const discount = formdata.get("discount");
    const description = formdata.get("description");
    const image = formdata.get("image");

    // validation
    if (!name) {
      return returnFunction(false, "cabin name is required", 401);
    }

    if (!description) {
      return returnFunction(false, "description is required", 401);
    }

    if (!image) {
      return returnFunction(false, "image is required", 401);
    }

    // upload image
    let imageUrl;

    if (image instanceof File) {
      const fileName = `courses/${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}-${image.name}`;

      const blob = await put(fileName, image, {
        access: "public",
      });

      imageUrl = blob.url;
    } else {
      imageUrl = image;
    }

    // save cabin
    const newCabin = new cabins({
      name,
      maxCapacity,
      reqularprice,
      discount,
      description,
      image: imageUrl,
    });

    await newCabin.save();

    return NextResponse.json({
      message: "cabin added successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  const requestBody = await req.json();
  const { _id } = requestBody;
  await cabins.findByIdAndUpdate(_id, requestBody, {
    new: true,
  });
  return NextResponse.json({ message: "cabin update succeddful" });
}
