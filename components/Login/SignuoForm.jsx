"use client";
import { useCtreateUser } from "@/src/features/auth/useCreateUser";
import { useForm } from "react-hook-form";

function SignuoForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { createNewUser, isPending } = useCtreateUser();
  function SendInfo(data) {
    createNewUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
    reset();
  }
  return (
    <form
      onSubmit={handleSubmit(SendInfo)}
      className="bg-white dark:bg-zinc-700 py-5 px-10 flex flex-col gap-5 mt-5 rounded-md shadow-sm"
    >
      <Input
        label="Full name"
        id="fullName"
        register={register}
        errors={errors?.fullName?.message}
      />
      <Input
        label="Email address"
        id="email"
        register={register}
        errors={errors?.email?.message}
      />
      <Input
        register={register}
        label="password (min 8 charechter)"
        id="password"
        type="password"
        error={{
          minlength: {
            value: 8,
            message: "password needs a minimum of 8 characters",
          },
        }}
        errors={errors?.password?.message}
      />
      <Input
        label="Repeat password"
        id="rpass"
        type="password"
        register={register}
        error={{
          validate: (value) =>
            value === getValues().password || " password need to match",
        }}
        errors={errors?.rpass?.message}
      />
      <div className="text-right space-x-4 pr-9">
        <button
          type="reset"
          className="border  px-1.5 py-1.5 rounded-md border-gray-200"
        >
          Cancel
        </button>
        <button className="bg-blue-600 dark:bg-blue-900 px-2.5 py-1.5 rounded-md  text-blue-50">
          Creat new user
        </button>
      </div>
    </form>
  );
}

function Input({ label, id, type = "text", register, error = {}, errors }) {
  return (
    <div className="flex items-center">
      <label className="basis-1/3 text-md font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(id, { required: "This sield is requierd", ...error })}
        className="border basis-1/4 p-1 border-zinc-300 rounded-md"
        type={type}
        id={id}
      />
      <p className="text-red-600 text-sm ml-3">{errors}</p>
    </div>
  );
}

export default SignuoForm;
