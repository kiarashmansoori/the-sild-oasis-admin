"use client";
import { createUser } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCtreateUser() {
  const { mutate: createNewUser, isPending } = useMutation({
    mutationFn: (body) => createUser(body),
    onSuccess: () => toast.success("New user added successfuly"),
    onError: () => toast.error("can not added user"),
  });
  return { createNewUser, isPending };
}
