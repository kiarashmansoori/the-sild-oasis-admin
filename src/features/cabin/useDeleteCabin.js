import { deleteCabin as deleteCabinaPI } from "@/services/apiCabin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClinet = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinaPI,
    onSuccess: () => {
      (queryClinet.invalidateQueries({ queryKey: ["cabin"] }),
        toast.success("Cabin deleted"));
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
