import { getCabins } from "@/services/apiCabin";
import { useQuery } from "@tanstack/react-query";
export function useCabin() {
  const {
    data: cabin,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  return { cabin, isLoading, error };
}
