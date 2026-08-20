import { updateUserapi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClinet = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserapi,
    onSuccess: () => {
      toast.success("user updated");
      queryClinet.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
