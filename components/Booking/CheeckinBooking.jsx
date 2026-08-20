"use client";
import { useSingleBookingInfo } from "@/src/features/booking/useSingleBookingInfo";
import Tag from "../Tag";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";
import BookingDataBox from "./BookingDataBox";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/helpers";
import { useCheekin } from "@/src/features/booking/useCheeckin";
import { useSettings } from "@/src/features/settings/useSettings";

function CheeckinBooking({ id }) {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [isBreakfast, setIsBreakfast] = useState(false);
  const router = useRouter();
  const { booking, isLoading } = useSingleBookingInfo(id);
  const { loadSetting, settings } = useSettings();
  const { checkin, isLoading: isUpdate } = useCheekin();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
    setIsBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  if (isLoading || loadSetting) return <Spinner />;

  const optionalBreakfastPrice =
    settings.breakfastPrice * booking.numNights * booking.numGuests;
  function handleCheeckin(id) {
    if (booking.status === "cheeckIn") return;
    if (isBreakfast) {
      checkin({
        id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: booking.totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ id, breakfast: {} });
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-10 items-center">
          <h1 className="text-3xl font-semibold">
            Booking #{booking._id.slice(-2)}
          </h1>
        </div>
        <button onClick={() => router.back()}>&larr; Back</button>
      </div>

      <BookingDataBox booking={booking} />
      {!booking.hasBreakfast && (
        <p className="space-x-3 bg-white py-4 px-4 mt-6 rounded-md">
          <input
            checked={isBreakfast}
            onChange={() => {
              setIsBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakFast"
            type="checkbox"
          />
          <label
            htmlFor="breakFast"
            className=" dark:text-zinc-800  select-none"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </label>
        </p>
      )}

      <p className="space-x-3 bg-white py-4 px-4 mt-6 rounded-md">
        <input
          checked={confirmPaid}
          disabled={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          type="checkbox"
        />
        <label htmlFor="confirm" className=" dark:text-zinc-800 select-none">
          I confirm that {booking.guestsId.fullName} has paid the total amount
          of{" "}
          {isBreakfast
            ? formatCurrency(booking.totalPrice)
            : `${formatCurrency(booking.totalPrice + optionalBreakfastPrice)} `}
        </label>
      </p>

      <div className="flex gap-2.5 justify-end p-3">
        {booking.status === "unconfirmed" && (
          <button
            disabled={!confirmPaid || isUpdate}
            className="bg-blue-600 cursor-pointer text-blue-100 px-3 py-1.5 rounded-md disabled:bg-blue-300 dark:disabled:text-blue-50 disabled:cursor-not-allowed"
            onClick={() => handleCheeckin(id)}
          >
            Check in booking #{booking._id.slice(-2)}
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

export default CheeckinBooking;
