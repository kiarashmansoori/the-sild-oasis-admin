import BookingDetails from "@/components/Booking/BookingDetails";

async function Page({ params }) {
  const { id } = await params;

  return <BookingDetails id={id} />;
}

export default Page;
