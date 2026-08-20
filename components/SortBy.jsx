"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "./features/Select";

function SortBy({ options }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handlerChange(e) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }
  return <Select options={options} value={sortBy} onChange={handlerChange} />;
}

export default SortBy;
