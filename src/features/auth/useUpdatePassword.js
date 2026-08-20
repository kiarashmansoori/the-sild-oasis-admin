"use client";
import { updatePasswordApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUdatePassword() {
  const { mutate: updatePass, isPending: pendingPass } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => toast.success("password change successfuly"),
    onError: () => toast.error("server error please try another time"),
  });

  return { updatePass, pendingPass };
}
