import Link from "next/link";
import Tag from "../Tag";
import CheckOutButtom from "../CheckOutButtom";
const statusToTagName = {
  unconfirmed: {
    bg: "bg-blue-200 dark:bg-blue-900",
    text: "text-blue-800 dark:text-blue-200",
  },
  checkedIn: {
    bg: "bg-green-200 dark:bg-green-900 ",
    text: "text-green-800 dark:text-green-200",
  },
};
function TodayItem({ activity }) {
  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_7rem_9rem] gap-3.5 items-center text-lg p-2 border-b border-gray-100">
      {activity.status === "unconfirmed" && (
        <Tag status={statusToTagName.unconfirmed}>Arriving</Tag>
      )}
      {activity.status === "checkedIn" && (
        <Tag status={statusToTagName.checkedIn}>Departing</Tag>
      )}
      <span>{activity.guestsId.countryFlag}</span>
      <div>{activity.guestsId.fullName}</div>
      <div className="text-sm">{activity.numNights} nights</div>
      {activity.status === "unconfirmed" && (
        <Link href={`/dashboard/bookings/${activity._id}/cheeckin`}>
          <button className="bg-blue-500 w-full px-1.5 py-1 rounded-md dark:bg-blue-900 text-sm text-blue-50">
            Check-In
          </button>
        </Link>
      )}
      {activity.status === "checkedIn" && <CheckOutButtom id={activity._id} />}
    </li>
  );
}

export default TodayItem;
