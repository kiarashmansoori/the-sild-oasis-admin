function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="w-md">
      <h2 className="font-bold text-xl mb-4">Delete {resourceName}</h2>
      <p>
        Are you sure you want to delete this {resourceName} permanently ? This
        action cannot be undone.
      </p>
      <div className="text-right space-x-4 mt-7 ">
        <button
          onClick={onCloseModal}
          disabled={disabled}
          className="px-3 py-1.5 rounded-md border border-blue-50 "
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={disabled}
          className="px-3 py-1.5 rounded-md text-blue-50 border border-red-950 bg-red-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
