import { getBookingsData } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
export function useBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingsData,
  });
  return { bookings, isLoading, error };
}
