// import { NextResponse } from "next/server";

// import connectDb from "@/services/connectDb";
// import cabins from "@/models/cabinsModal";
// import guests from "@/models/guestsModel";
// import bookings from "@/models/bookingsModel";

// const randomNumber = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

// const randomBoolean = () => Math.random() > 0.5;

// // یک تاریخ رندم بین 90 روز پیش تا امروز
// const randomDate = () => {
//   const now = new Date();

//   const past = new Date();
//   past.setDate(past.getDate() - 90);

//   return new Date(
//     past.getTime() + Math.random() * (now.getTime() - past.getTime()),
//   );
// };

// export async function POST() {
//   try {
//     await connectDb();

//     // =========================
//     // CABINS
//     // =========================

//     const cabinsData = [];

//     for (let i = 0; i < 20; i++) {
//       const regularPrice = randomNumber(100, 500);

//       cabinsData.push({
//         name: `Cabin ${Date.now()}-${i}`,

//         maxCapacity: randomNumber(2, 10),

//         reqularprice: regularPrice,

//         discount: randomNumber(0, 100),

//         description: `Beautiful cabin number ${i + 1}`,

//         image: `/images/courses/images.jpeg`,
//       });
//     }

//     const createdCabins = await cabins.insertMany(cabinsData);

//     // =========================
//     // GUESTS
//     // =========================

//     const firstNames = [
//       "John",
//       "Michael",
//       "David",
//       "James",
//       "Robert",
//       "William",
//       "Daniel",
//       "Thomas",
//       "Emma",
//       "Olivia",
//       "Sophia",
//       "Emily",
//     ];

//     const lastNames = [
//       "Smith",
//       "Johnson",
//       "Brown",
//       "Williams",
//       "Jones",
//       "Miller",
//       "Davis",
//       "Wilson",
//     ];

//     const nationalities = [
//       "American",
//       "British",
//       "German",
//       "French",
//       "Canadian",
//       "Australian",
//       "Italian",
//       "Spanish",
//     ];

//     const guestsData = [];

//     for (let i = 0; i < 100; i++) {
//       const firstName = randomItem(firstNames);
//       const lastName = randomItem(lastNames);

//       guestsData.push({
//         fullName: `${firstName} ${lastName}`,

//         email: `guest-${Date.now()}-${i}@example.com`,

//         nationality: randomItem(nationalities),

//         countryFlag: "🇺🇸",

//         nationalId: randomNumber(10000000, 99999999),
//       });
//     }

//     const createdGuests = await guests.insertMany(guestsData);

//     // =========================
//     // BOOKINGS
//     // =========================

//     const bookingsData = [];

//     for (let i = 0; i < 100; i++) {
//       const cabin = randomItem(createdCabins);

//       const guest = randomItem(createdGuests);

//       // startDate بین 90 روز پیش تا امروز
//       const startDate = randomDate();

//       // تعداد شب
//       const numNights = randomNumber(1, 7);

//       // endDate
//       const endDate = new Date(startDate);

//       endDate.setDate(endDate.getDate() + numNights);

//       // تعداد مهمان متناسب با ظرفیت Cabin
//       const numGuests = randomNumber(1, cabin.maxCapacity);

//       // قیمت Cabin
//       const cabinPrice = cabin.reqularprice * numNights;

//       // هزینه اضافی
//       const extrasPrice = randomNumber(0, 300);

//       // قیمت کل
//       const totalPrice = cabinPrice + extrasPrice;

//       // createdAt رندم بین 90 روز پیش تا امروز
//       const createdAt = randomDate();

//       // updatedAt بعد از createdAt
//       const updatedAt = new Date(
//         createdAt.getTime() +
//           Math.random() * (Date.now() - createdAt.getTime()),
//       );

//       bookingsData.push({
//         startDate,

//         endDate,

//         numNights,

//         numGuests,

//         cabinPrice,

//         extrasPrice,

//         totalPrice,

//         status: randomItem(["unconfirmed", "checkedIn", "checkedOut"]),

//         hasBreakfast: randomBoolean(),

//         isPaid: randomBoolean(),

//         observation: randomItem([
//           "",
//           "Late check-in",
//           "Extra bed requested",
//           "No special requests",
//           "Guest requested a quiet room",
//         ]),

//         cabinId: cabin._id,

//         guestsId: guest._id,

//         // مهم
//         createdAt,

//         updatedAt,
//       });
//     }

//     await bookings.insertMany(bookingsData);

//     return NextResponse.json({
//       success: true,

//       message: "Fake data created successfully",

//       cabins: createdCabins.length,

//       guests: createdGuests.length,

//       bookings: bookingsData.length,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       { status: 500 },
//     );
//   }
// }
import { NextResponse } from "next/server";

import connectDb from "@/services/connectDb";
import cabins from "@/models/cabinsModal";
import guests from "@/models/guestsModel";
import bookings from "@/models/bookingsModel";

const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

export async function POST() {
  try {
    await connectDb();

    // گرفتن کابین‌ها
    const cabinsData = await cabins
      .find()
      .sort({ createdAt: 1 })
      .skip(3)
      .limit(10);

    // گرفتن مهمان‌ها
    const guestsData = await guests.find().limit(20);

    if (cabinsData.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "حداقل 10 کابین از Cabin 004 به بعد لازم است",
        },
        { status: 400 },
      );
    }

    if (guestsData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "هیچ مهمانی در دیتابیس وجود ندارد",
        },
        { status: 400 },
      );
    }

    // =========================
    // TODAY
    // =========================

    const today = new Date();

    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    // =========================
    // BOOKINGS
    // =========================

    const bookingsData = [];

    // -------------------------
    // 5 UNCONFIRMED
    // startDate = today
    // -------------------------

    for (let i = 0; i < 5; i++) {
      const cabin = cabinsData[i];
      const guest = randomItem(guestsData);

      const startDate = new Date(startOfToday);

      // مثلا اقامت 1 تا 7 شب
      const numNights = Math.floor(Math.random() * 7) + 1;

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + numNights);

      const cabinPrice = cabin.reqularprice * numNights;
      const extrasPrice = 0;
      const totalPrice = cabinPrice + extrasPrice;

      bookingsData.push({
        startDate,
        endDate,

        numNights,

        numGuests: 1,

        cabinPrice,
        extrasPrice,
        totalPrice,

        status: "unconfirmed",

        hasBreakfast: false,
        isPaid: false,

        observation: "",

        cabinId: cabin._id,
        guestsId: guest._id,
      });
    }

    // -------------------------
    // 5 CHECKED IN
    // endDate = today
    // -------------------------

    for (let i = 0; i < 5; i++) {
      const cabin = cabinsData[i + 5];
      const guest = randomItem(guestsData);

      const numNights = Math.floor(Math.random() * 7) + 1;

      // startDate چند روز قبل
      const startDate = new Date(startOfToday);
      startDate.setDate(startDate.getDate() - numNights);

      // endDate = امروز
      const endDate = new Date(endOfToday);

      const cabinPrice = cabin.reqularprice * numNights;
      const extrasPrice = 0;
      const totalPrice = cabinPrice + extrasPrice;

      bookingsData.push({
        startDate,
        endDate,

        numNights,

        numGuests: 1,

        cabinPrice,
        extrasPrice,
        totalPrice,

        status: "checkedIn",

        hasBreakfast: false,
        isPaid: true,

        observation: "",

        cabinId: cabin._id,
        guestsId: guest._id,
      });
    }

    // ذخیره
    const createdBookings = await bookings.insertMany(bookingsData);

    return NextResponse.json({
      success: true,
      message: "10 fake bookings created successfully",

      bookings: createdBookings.length,

      unconfirmed: 5,
      checkedIn: 5,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
