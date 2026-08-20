import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "@/utils/helpers";

function Stats({ confirmedStays, bookings, numDays, cabinCount }) {
  //1.
  const numBookings = bookings.length;
  //2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3.
  const checkins = confirmedStays.length;
  //4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase size={35} />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes size={35} />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="red"
        icon={<HiOutlineCalendarDays size={35} />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar size={35} />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
