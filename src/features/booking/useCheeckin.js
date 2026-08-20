"use client";
import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCheekin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: checkin, isLoading } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: "checkedIn",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data._id.slice(-2)} successfuly cheeckin`);
      queryClient.invalidateQueries({ active: true });
      router.push("/dashboard/account");
    },
    onError: () => toast.error("there was an error"),
  });

  return { checkin, isLoading };
}
