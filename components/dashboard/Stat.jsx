const colors = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

function Stat({ color, icon, title, value }) {
  return (
    <div className="border border-gray-100 dark:bg-zinc-700  bg-white dark:border-gray-600 rounded-md p-2.5 grid grid-cols-[3.7rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1.5 items-center">
      <div
        className={`row-span-full aspect-square rounded-full flex items-center justify-center ${colors[color]} `}
      >
        {icon}
      </div>
      <h5 className="self-end text-sm text-zinc-700 dark:text-zinc-300  uppercase tracking-[0.4px] font-semibold text-grey-500">
        {title}
      </h5>
      <p className="text-2xl self-start font-medium">{value}</p>
    </div>
  );
}

export default Stat;
