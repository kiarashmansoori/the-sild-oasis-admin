import CheeckinBooking from "@/components/Booking/CheeckinBooking";

async function page({ params }) {
  const { id } = await params;
  return <CheeckinBooking id={id} />;
}

export default page;
