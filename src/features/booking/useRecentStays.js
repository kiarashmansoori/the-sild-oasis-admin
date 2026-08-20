"use client";
import { getBookingsStay } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "next/navigation";

export function useRecentStays() {
  const searchParams = useSearchParams();
  const date = searchParams.get("last") || 7;
  const queryDate = subDays(new Date(), date).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getBookingsStay(queryDate),
    queryKey: ["stays", `last-${date}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checkedIn" || stay.status === "checkedOut",
  );

  return { isLoading, stays, confirmedStays, date };
}
