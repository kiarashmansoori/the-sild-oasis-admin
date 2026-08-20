import { addCabin } from "@/services/apiCabin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClinet = useQueryClient();

  const { mutate: createCabinApi, isPending: isCreate } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("cabin added");
      queryClinet.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createCabinApi, isCreate };
}
