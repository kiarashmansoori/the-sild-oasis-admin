import { useCheckout } from "@/src/features/booking/useCheckOut";
import { FaSpider } from "react-icons/fa";

function CheckOutButtom({ id }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <button
      onClick={() => checkout(id)}
      className="bg-blue-500 px-1.5 py-1 rounded-md dark:bg-blue-900 text-sm text-blue-50"
    >
      {isCheckingOut ? (
        <FaSpider className="animate-spin text-center" />
      ) : (
        <span>Check-Out</span>
      )}
    </button>
  );
}

export default CheckOutButtom;
