import DashboardFilter from "@/components/dashboard/DashboardFilter";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

function Page() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </div>
  );
}

export default Page;
