"use client";
import { ImSpinner2 } from "react-icons/im";
import { useUser } from "@/src/features/auth/useUser";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import { useUpdateUser } from "@/src/features/auth/useUpdateUser";

function UpdateUserDataForm() {
  const { user, isLoading } = useUser();
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    if (user) setFullName(user.fullName);
  }, [user]);

  const [avatar, setAvatar] = useState(null);
  const { updateUser, isUpdating } = useUpdateUser();
  if (isLoading) return <Spinner />;

  function updateHandler(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({ fullName, avatar });
  }
  function handleCancel() {
    setFullName(user.fullName || "");
  }
  return (
    <form
      onSubmit={(e) => updateHandler(e)}
      className="bg-white dark:bg-zinc-700 py-5 px-10 flex flex-col gap-5 mt-5 rounded-md shadow-sm"
    >
      <Input
        label="Email address"
        id="email"
        value={user.email}
        disabled={true}
      />
      <Input
        label="Full name"
        id="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <div className="flex items-center">
        <label className="basis-1/3 text-md font-medium">Avatar image</label>
        <input
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          type="file"
          className=" text-sm rounded-md file:font-inherit file:font-medium file:px-4 file:py-2 file:mr-5 file:rounded-md file:border-0  file:text-blue-50  file:bg-blue-600 dark:file:bg-blue-900 file:cursor-pointer file:transition-colors  hover:file:bg-blue-700
  "
        />
      </div>
      <div className="text-right space-x-4 pr-9">
        <button
          onClick={() => handleCancel()}
          type="reset"
          className="border  px-1.5 py-1.5 rounded-md border-gray-200"
        >
          Cancel
        </button>
        <button className="bg-blue-600 dark:bg-blue-900 px-2.5 py-1.5 rounded-md  text-blue-50">
          {isUpdating ? (
            <ImSpinner2 className="text-center" color="white" />
          ) : (
            "Creat new user"
          )}
        </button>
      </div>
    </form>
  );
}

function Input({
  label,
  id,
  type = "text",
  value,
  onChange = () => {},
  disabled = false,
}) {
  return (
    <div className="flex items-center">
      <label className="basis-1/3 text-md font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        disabled={disabled}
        className="border disabled:bg-gray-200 disabled:text-gray-500 basis-1/4 p-1 border-zinc-300 rounded-md"
        value={value}
        onChange={onChange}
        type={type}
        id={id}
      />
    </div>
  );
}
export default UpdateUserDataForm;
