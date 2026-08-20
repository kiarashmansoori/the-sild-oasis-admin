"use client";

import { HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMoon } from "react-icons/hi";
import LogOut from "./Login/LogOut";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function HeaderMenu() {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul className="flex">
      <li>
        <button
          onClick={() => router.push("/dashboard/account")}
          className="p-2.5 rounded-sm transition-all duration-200 hover:bg-gray-100 dark:hover:text-zinc-950"
        >
          <HiOutlineUser size={20} />
        </button>
      </li>

      <li>
        <button
          className="p-2.5 rounded-sm dark:hover:text-zinc-950 transition-all duration-200 hover:bg-gray-100"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted &&
            (resolvedTheme === "dark" ? (
              <HiOutlineSun size={20} />
            ) : (
              <HiOutlineMoon size={20} />
            ))}
        </button>
      </li>

      <li>
        <LogOut />
      </li>
    </ul>
  );
}

export default HeaderMenu;
