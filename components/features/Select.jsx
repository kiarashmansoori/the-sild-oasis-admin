function Select({ options, value, onChange }) {
  return (
    <select
      onChange={onChange}
      value={value}
      className="text-md px-1 py-2.5 font-light rounded-sm bg-white dark:bg-zinc-700 dark:border dark:border-zinc-400 shadow-sm"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
