"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineCog6Tooth,
  HiOutlineUsers,
} from "react-icons/hi2";

const links = [
  {
    href: "/dashboard",
    label: "Home",
    icon: <HiOutlineHome className="inline" size="22px" />,
  },
  {
    href: "/dashboard/bookings",
    label: "Bookings",
    icon: <HiOutlineCalendarDays className="inline" size="22px" />,
  },
  {
    href: "/dashboard/cabins",
    label: "Cabins",
    icon: <HiOutlineHomeModern className="inline" size="22px" />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <HiOutlineCog6Tooth className="inline" size="22px" />,
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: <HiOutlineUsers className="inline" size="22px" />,
  },
];

function Navbar() {
  const path = usePathname();
  return (
    <nav className="px-7">
      <ul>
        {links.map((link) => (
          <Link
            key={link.href}
            className={`p-3 dark:text-zinc-50 cursor-pointer rounded-sm block ${path == link.href ? "bg-blue-100 dark:bg-zinc-500" : "hover:bg-blue-50 dark:hover:bg-zinc-500"}`}
            href={link.href}
          >
            <li className="flex items-center gap-2.5">
              {link.icon}
              <span> {link.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
