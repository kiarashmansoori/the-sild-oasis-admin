"use client";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import FormRow from "../FormRow";
import { useAuth } from "@/src/features/auth/useAuth";

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { Login, isPending } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    Login({ email, password });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="py-8 px-7 rounded-md border border-gray-100 bg-white dark:bg-zinc-700 dark:border-zinc-900"
    >
      <FormRow label="Email address" id="email">
        <input
          className="border border-gray-300 rounded-md px-1 py-1.5"
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" id="password">
        <input
          className="border border-gray-300 px-1 rounded-md py-1.5"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <button className="bg-blue-500 dark:bg-blue-900 py-2 flex items-center justify-center text-blue-50 rounded-md text-lg">
          {isPending ? (
            <ImSpinner2 color="white" className="text-center animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </FormRow>
    </form>
  );
}

export default LoginForm;
