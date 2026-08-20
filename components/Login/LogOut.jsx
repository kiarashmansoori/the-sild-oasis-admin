"use client";
import { useLogout } from "@/src/features/auth/useLogout";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";

function LogOut() {
  const { LogOut, isPending } = useLogout();
  return (
    <button
      onClick={() => LogOut()}
      className="p-2.5 dark:hover:text-zinc-950 rounded-sm transition-all duration-200 hover:bg-gray-100"
    >
      {isPending ? (
        <span className="text-center animate-spin">
          <ImSpinner2 color="blue" />
        </span>
      ) : (
        <HiArrowRightOnRectangle size={20} />
      )}
    </button>
  );
}

export default LogOut;
