"use client";
import { Logout } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogout(params) {
  const router = useRouter();
  const { mutate: LogOut, isPending } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("Logout successfuly");
      router.refresh();
      router.push("/login");
    },
  });
  return { LogOut, isPending };
}
