function FormRow({ label, id, children }) {
  return (
    <div className="flex flex-col gap-2.5 mt-3">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export default FormRow;
