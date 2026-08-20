"use client";
import { getBookingsAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "next/navigation";

export function useRecentBookings() {
  const searchParams = useSearchParams();
  const date = searchParams.get("last") || 7;
  const queryDate = subDays(new Date(), date).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${date}`],
  });

  return { isLoading, bookings };
}
