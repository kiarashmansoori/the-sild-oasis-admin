import { getUser } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
  return { user, isLoading };
}
