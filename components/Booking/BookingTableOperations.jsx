import Filter from "../Filter";
import SortBy from "../SortBy";

function BookingTableOperations() {
  return (
    <div className="flex items-center gap-6">
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checkedOut", label: "Checked out" },
          { value: "checkedIn", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </div>
  );
}

export default BookingTableOperations;
