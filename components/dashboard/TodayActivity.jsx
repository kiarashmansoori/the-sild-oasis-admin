import { useTodayActivity } from "@/src/features/booking/useTodayActivity";
import Spinner from "../Spinner";
import TodayItem from "./TodayItem";

function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();
  return (
    <div className="bg-white dark:bg-zinc-700 border border-gray-100 dark:border-gray-500 rounded-md p-3.5 flex flex-col gap-3 pt-3.5 col-start-1 col-span-2">
      <div>
        <h2 className="text-xl font-semibold">Today</h2>
      </div>
      {!isLoading ? (
        activities.length > 0 ? (
          <ul className=" overflow-x-hidden overflow-scroll max-h-[240px]">
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity._id} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-2xl font-medium mt-6">
            No activity Today
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;
