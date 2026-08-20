import { FaSpinner } from "react-icons/fa";
function Spinner() {
  return (
    <div className="h-screen flex items-center justify-center">
      <FaSpinner className="animate-spin text-blue-500" size={50} />
    </div>
  );
}

export default Spinner;
