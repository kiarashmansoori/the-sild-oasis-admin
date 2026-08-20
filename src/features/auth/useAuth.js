"use client";
import { sendAuthInfo } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAuth() {
  const router = useRouter();
  const { mutate: Login, isPending } = useMutation({
    mutationFn: (boody) => sendAuthInfo(boody),
    onSuccess: () => {
      toast.success("Login successfuly");
      router.refresh();
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("email or password invalid");
    },
  });

  return { Login, isPending };
}
