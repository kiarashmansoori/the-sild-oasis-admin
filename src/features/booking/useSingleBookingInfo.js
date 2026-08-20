import { getBookingData } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
export function useSingleBookingInfo(id) {
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingData(id),
  });
  return { booking, isLoading, error };
}
