"use client";
import Spinner from "@/components/Spinner";
import { useSettings } from "@/src/features/settings/useSettings";

function Page() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  if (isLoading) return <Spinner />;
  return (
    <div>
      <form className="p-10  flex-col bg-white dark:bg-zinc-700 dark:border-zinc-800 border border-zinc-200 ">
        <div>
          <div className="mt-4 flex ">
            <label className=" basis-1/3 font-semibold">
              Minimum nights/booking
            </label>
            <input
              type="number"
              defaultValue={minBookingLength}
              className="basis-1/5 border border-zinc-300 py-1 rounded-sm px-1.5"
            />
          </div>
          <div className="mt-4 flex ">
            <label className=" basis-1/3 font-semibold">
              Maximum nights/booking
            </label>
            <input
              type="number"
              defaultValue={maxBookingLength}
              className="basis-1/5 border border-zinc-300 py-1 rounded-sm px-1.5"
            />
          </div>
          <div className="mt-4 flex ">
            <label className=" basis-1/3 font-semibold">
              Maximum guests/booking
            </label>
            <input
              type="number"
              defaultValue={maxGuestsPerBooking}
              className="basis-1/5 border border-zinc-300 py-1 rounded-sm px-1.5"
            />
          </div>
          <div className="mt-4 flex ">
            <label className=" basis-1/3 font-semibold">Breakfast price</label>
            <input
              type="number"
              defaultValue={breakfastPrice}
              className="basis-1/5 border border-zinc-300 py-1 rounded-sm px-1.5"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
