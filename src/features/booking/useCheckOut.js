"use client";
import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checkedOut",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data._id.slice(-2)} successfuly cheeckout`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("there was an error"),
  });

  return { checkout, isCheckingOut };
}
