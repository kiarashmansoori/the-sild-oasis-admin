"use client";
import { useRecentBookings } from "@/src/features/booking/useRecentBooking";
import Spinner from "../Spinner";
import { useRecentStays } from "@/src/features/booking/useRecentStays";
import Stats from "./Stats";
import { useCabin } from "@/src/features/cabin/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const {
    isLoading: isLoading2,
    confirmedStays,
    date: numDays,
  } = useRecentStays();
  const { cabin, isLoading: isLoadnig3 } = useCabin();
  if (isLoading1 || isLoading2 || isLoadnig3) return <Spinner />;

  return (
    <div className="grid grid-cols-4 grid-rows-[auto 34rem auto] gap-5 mt-10">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabin.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
