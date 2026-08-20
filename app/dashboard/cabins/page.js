"use client";

import AddCabin from "@/components/cabin/AddCabin";
import CabinTable from "@/components/cabin/cabinTable";
import CabinTableOperations from "@/components/cabin/CabinTableOperations";

function Page() {
  return (
    <>
      <ul className="flex items-center mb-7 justify-between p-1">
        <li className="text-3xl font-semibold">All cabins</li>
        <CabinTableOperations />
      </ul>
      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Page;
