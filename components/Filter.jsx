"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

function Filter({ filterField, options }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get(filterField) || options.at(0).value;

  function handlerClick(value) {
    const params = new URLSearchParams(searchParams);
    params.set(filterField, value);
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="border border-gray-50 bg-white shadow-sm rounded-sm  flex">
      {options.map((option) => (
        <Button
          key={option.value}
          handler={() => handlerClick(option.value)}
          active={option.value === active}
          disabled={option.value === active}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
function Button({ children, active, handler, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={handler}
      className={`rounded-sm font-medium transition-all duration-300 text-md hover:bg-blue-500 dark:text-zinc-950 dark:hover:bg-zinc-500 hover:text-blue-50 px-4 py-2 disabled:cursor-not-allowed ${active ? "bg-blue-500 dark:bg-zinc-500 text-blue-50" : ""}`}
    >
      {children}
    </button>
  );
}

export default Filter;
