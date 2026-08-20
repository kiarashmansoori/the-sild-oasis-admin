import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import DataItem from "../features/DataItem";

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observation,
    isPaid,
    guestsId: { fullName: guestName, email, countryFlag, nationalId },
    cabinId: { name: cabinName },
  } = booking;
  return (
    <div className=" overflow-hidden mt-10 bg-white dark:bg-zinc-100 rounded-md">
      <header className="bg-blue-500 dark:bg-zinc-500 dark:text-zinc-100 py-4 px-7 text-blue-100 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineHomeModern size={22} />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>
        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>
      <section className="py-3.5 px-10">
        <div className="flex items-center gap-2 mb-2.5 dark:text-zinc-600 text-gray-500">
          {countryFlag && <span>{countryFlag}</span>}
          <p className="text-gray-900 dark:text-zinc-950">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalId}</p>
        </div>

        {observation && (
          <DataItem
            className="dark:text-zinc-900"
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observation"
          >
            {observation}
          </DataItem>
        )}
        <DataItem
          className="dark:text-zinc-900"
          icon={<HiOutlineCheckCircle />}
          label="Breakfast included?"
        >
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div
          className={`flex items-center justify-between py-2.5 px-6 rounded-sm mt-3.5 ${isPaid ? "bg-green-100 dark:bg-green-800 text-green-700" : "bg-yellow-100 dark:bg-neutral-500 dark:text-neutral-100 text-yellow-700"}`}
        >
          <DataItem
            className="dark:text-neutral-100"
            spanClassName="dark:text-neutral-300"
            icon={<HiOutlineCurrencyDollar />}
            label={`Total price`}
          >
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>
          <p>
            {isPaid ? (
              <span className="dark:text-neutral-100">Paid</span>
            ) : (
              "Will pay at property"
            )}
          </p>
        </div>
      </section>
      <footer className="p-2.5 px-10 text-gray-600 font-normal text-right">
        created at....
      </footer>
    </div>
  );
}

export default BookingDataBox;
