"use client";
import { useUdatePassword } from "@/src/features/auth/useUpdatePassword";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [copassword, setCopassword] = useState("");
  const { updatePass, pendingPass } = useUdatePassword();

  function updateHandler(e) {
    e.preventDefault();
    if (password !== copassword)
      return toast.error("password and confirm password is differnt");
    if (password.length < 8)
      return toast.error("password must be 8 charecter or longer");
    updatePass(password);
    setCopassword("");
    setPassword("");
  }
  return (
    <form
      onSubmit={(e) => updateHandler(e)}
      className="bg-white dark:bg-zinc-700 py-5 px-10 flex flex-col gap-5 mt-5 rounded-md shadow-sm"
    >
      <Input
        label="New password (8 charechter)"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label="Confirm password"
        id="repass"
        value={copassword}
        onChange={(e) => setCopassword(e.target.value)}
      />

      <div className="text-right space-x-4 pr-9">
        <button
          type="reset"
          className="border  px-1.5 py-1.5 rounded-md border-gray-200"
        >
          Cancel
        </button>
        <button className="bg-blue-600 dark:bg-blue-900 px-2.5 py-1.5 rounded-md  text-blue-50">
          {pendingPass ? (
            <ImSpinner2 className="text-center animate-spin" color="white" />
          ) : (
            "Update password"
          )}
        </button>
      </div>
    </form>
  );
}
function Input({ label, id, value, onChange = () => {}, disabled = false }) {
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
        type="password"
        id={id}
      />
    </div>
  );
}
export default UpdatePassword;
