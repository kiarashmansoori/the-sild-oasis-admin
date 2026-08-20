"use client";
import { format, isToday } from "date-fns";
import Table from "../Table";
import Tag from "../Tag";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import Menus from "../Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/src/features/booking/useCheckOut";
import Modal from "../Modal";
import ConfirmDelete from "../ConfirmDelete";
import { useDeleteBooking } from "@/src/features/booking/useDeleteBooking";

function BookingRow({ booking }) {
  console.log(booking.guestsId);
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const router = useRouter();
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

  return (
    <Table.Row>
      <li className="font-semibold">{booking?.cabinId?.name}</li>
      <li className="flex flex-col gap-1">
        <span className="font-medium">{booking?.guestsId?.fullName}</span>
        <span className="text-gray-600">{booking?.guestsId?.email}</span>
      </li>
      <li className="flex flex-col gap-1">
        <span className="font-medium">
          {isToday(new Date(booking.startDate))
            ? "Today"
            : formatDistanceFromNow(booking.startDate)}
          &rarr; {booking.numNights} nights stay
        </span>
        <span className="text-gray-600">
          {format(new Date(booking.startDate), "MM dd yyyy")} &mdash;
          {format(new Date(booking.endDate), "MMM dd yyyy")}
        </span>
      </li>
      <li>
        <Tag status={statusToTagName[booking.status]}>{booking.status}</Tag>
      </li>
      <li className="font-medium">{formatCurrency(booking.totalPrice)}</li>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking._id} />
          <Menus.List id={booking._id}>
            <Menus.Button
              onClick={() => router.push(`/dashboard/bookings/${booking._id}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>
            {booking.status === "unconfirmed" && (
              <Menus.Button
                onClick={() =>
                  router.push(`/dashboard/bookings/${booking._id}/cheeckin`)
                }
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}
            {booking.status === "checkedIn" && (
              <Menus.Button
                onClick={() => checkout(booking._id)}
                icon={<HiArrowUpOnSquare />}
              >
                Check Out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`#${booking._id.slice(-2)}`}
              onConfirm={() => deleteBooking(booking._id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
