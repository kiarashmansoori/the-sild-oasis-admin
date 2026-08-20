function Tag({ children, status }) {
  return (
    <span
      className={`w-fit text-sm rounded-full px-4 py-1  ${status.bg} ${status.text}`}
    >
      {children}
    </span>
  );
}

export default Tag;
