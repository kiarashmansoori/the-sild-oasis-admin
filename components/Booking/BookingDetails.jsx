"use client";
import { useSingleBookingInfo } from "@/src/features/booking/useSingleBookingInfo";
import Spinner from "../Spinner";
import Tag from "../Tag";
import { useRouter } from "next/navigation";
import BookingDataBox from "./BookingDataBox";
import { useCheckout } from "@/src/features/booking/useCheckOut";
import Modal from "../Modal";
import ConfirmDelete from "../ConfirmDelete";
import { useDeleteBooking } from "@/src/features/booking/useDeleteBooking";

function BookingDetails({ id }) {
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: {
      bg: "bg-blue-200 dark:bg-blue-900",
      text: "text-blue-800 dark:text-blue-200",
    },
    checkedIn: {
      bg: "bg-green-200 dark:bg-green-900 ",
      text: "text-green-800 dark:text-green-200",
    },
    checkedOut: {
      bg: "bg-gray-200 dark:bg-zinc-600 ",
      text: "text-gray-800 dark:text-zinc-200 ",
    },
  };
  const { booking, isLoading, error } = useSingleBookingInfo(id);
  const router = useRouter();
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-10 items-center">
          <h1 className="text-3xl font-semibold">
            Booking #{booking._id.slice(-2)}
          </h1>
          <Tag status={statusToTagName[booking.status]}>{booking.status}</Tag>
        </div>
        <button onClick={() => router.back()}>&larr; Back</button>
      </div>
      <BookingDataBox booking={booking} />
      <div className="flex gap-2.5 justify-end p-3">
        <Modal>
          <Modal.Open opens="delete">
            <button className="bg-red-600 border dark:bg-red-900 dark:border-red-950 border-red-700 rounded-md px-3.5 py-1.5 text-red-50">
              Delete
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`#${booking._id.slice(-2)}`}
              onConfirm={() =>
                deleteBooking(booking._id, {
                  onSettled: () => router.back(),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        {booking.status === "unconfirmed" && (
          <button
            className="bg-blue-600 dark:bg-blue-900  text-blue-100 px-3 py-1.5 rounded-md"
            onClick={() => router.push(`/dashboard/bookings/${id}/cheeckin`)}
          >
            Check in
          </button>
        )}

        {booking.status === "checkedIn" && (
          <button
            className="bg-blue-600 dark:bg-blue-900  text-blue-100 px-3 py-1.5 rounded-md"
            onClick={() => checkout(id)}
          >
            Check out
          </button>
        )}

        <button
          className="border border-gray-300 rounded-sm px-1.5"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </>
  );
}

export default BookingDetails;
