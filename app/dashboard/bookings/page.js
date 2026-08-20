import BookingTable from "@/components/Booking/BookingTable";
import BookingTableOperations from "@/components/Booking/BookingTableOperations";

function Page() {
  return (
    <>
      <ul className="flex items-center mb-7 justify-between p-1">
        <li className="text-3xl font-semibold">All cabins</li>

        <BookingTableOperations />
      </ul>

      <BookingTable />
    </>
  );
}

export default Page;
