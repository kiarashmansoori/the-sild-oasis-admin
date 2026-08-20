import { deleteBooking as deleted } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClinet = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleted(id),
    onSuccess: () => {
      (queryClinet.invalidateQueries({ active: true }),
        toast.success("Booking deleted"));
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}
