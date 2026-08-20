function DataItem({ icon, label, children, className, spanClassName }) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <span className={`flex  items-center gap-1.5 font-medium ${className}`}>
        {icon} <span>{label}</span>
      </span>
      <span className={`text-gray-500 ${spanClassName}`}>{children}</span>
    </div>
  );
}

export default DataItem;
