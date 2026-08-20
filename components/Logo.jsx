"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-center">
      <Link href="/dashboard">
        <Image
          loading="eager"
          className="inline"
          src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
          width={160}
          height={160}
          alt="logo"
          style={{ width: "auto", height: "auto" }}
        />
      </Link>
    </div>
  );
}

export default Logo;
