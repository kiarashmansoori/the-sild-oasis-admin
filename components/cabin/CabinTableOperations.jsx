import Filter from "../Filter";
import SortBy from "../SortBy";

function CabinTableOperations() {
  return (
    <div className="flex items-center gap-6">
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "reqularprice-asc", label: "Sort by price (low first)" },
          { value: "reqularprice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-dec", label: "Sort by capacity (high first)" },
        ]}
      />
    </div>
  );
}

export default CabinTableOperations;
