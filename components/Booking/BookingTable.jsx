"use client";
import { useBookings } from "@/src/features/booking/useBooking";
import { useSearchParams } from "next/navigation";
import Menus from "../Menus";
import Table from "../Table";
import BookingRow from "./BookingRow";
import Spinner from "../Spinner";

function BookingTable() {
  const { bookings, isLoading } = useBookings();

  //FILTER
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  let filterBooking;
  if (status === "all") filterBooking = bookings;
  if (status === "checkedIn")
    filterBooking = bookings.filter(
      (booking) => booking.status === "checkedIn",
    );
  if (status === "checkedOut")
    filterBooking = bookings.filter(
      (booking) => booking.status === "checkedOut",
    );
  if (status === "unconfirmed")
    filterBooking = bookings.filter(
      (booking) => booking.status === "unconfirmed",
    );

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <li>CABIN</li>
          <li>GUESTS</li>
          <li>DATES</li>
          <li>STATUS</li>
          <li>AMOUNT</li>
          <li></li>
        </Table.Header>
        <Table.Body
          data={filterBooking}
          render={(booking) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
