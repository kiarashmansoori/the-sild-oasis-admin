"use client";

import { useCabin } from "@/src/features/cabin/useCabin";
import CabinRow from "./CabinRow";
import Spinner from "../Spinner";
import Table from "../Table";
import Menus from "../Menus";
import { useSearchParams } from "next/navigation";

function CabinTable() {
  const { cabin, isLoading } = useCabin();
  const searchParams = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabin;
  if (filterValue === "all") filteredCabin = cabin;
  if (filterValue === "no-discount")
    filteredCabin = cabin.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabin = cabin.filter((cabin) => cabin.discount > 0);
  if (isLoading) return <Spinner />;

  //SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [feild, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabin.sort(
    (a, b) => (a[feild] - b[feild]) * modifier,
  );
  return (
    <Menus>
      <Table columns="1fr 1.8fr 2.2fr 1fr 1fr 0.5fr">
        <Table.Header>
          <li></li>
          <li>Cabin</li>
          <li>Capacity</li>
          <li>Price</li>
          <li>Discount</li>
          <li></li>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin._id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
