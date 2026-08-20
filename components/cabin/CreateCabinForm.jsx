"use client";
import { useForm } from "react-hook-form";
import Error from "../Error";
import { useState } from "react";
import { useCreateCabin } from "@/src/features/cabin/useCreateCabin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "@/services/apiCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const [image, setImage] = useState(null);
  function handleImageChane(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }
  const { _id, ...editValues } = cabinToEdit;
  const isEditing = Boolean(_id);
  const { createCabinApi, isCreate } = useCreateCabin();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditing ? editValues : {},
  });

  const queryClinet = useQueryClient();
  const { mutate: editCabin, isPending: isEdit } = useMutation({
    mutationFn: (data) => addCabin(data, data._id, image),
    onSuccess: () => {
      toast.success("cabin edited");
      queryClinet.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  function createCabin(data) {
    if (isEditing) {
      editCabin({ cabin: data, image, id: _id });
      onCloseModal?.();
    } else {
      createCabinApi({ cabin: data, image });
      reset();
      onCloseModal?.();
    }
  }

  const wating = isCreate || isEditing;
  const { errors } = formState;
  return (
    <form
      onSubmit={handleSubmit(createCabin)}
      className={`p-10  flex-col bg-white dark:bg-zinc-700 dark:border-zinc-800 border ${onCloseModal ? "w-2xl" : ""} border-zinc-200`}
    >
      <div className="">
        <div className="mt-4 flex justify-between">
          <label className=" basis-1/3 font-semibold">Cabin name</label>
          <input
            {...register("name", { required: "این فیلد اجباری است" })}
            className="basis-1/3 border border-zinc-300 py-1 rounded-sm px-1.5"
            type="text"
          />
          <div className="basis-1/3">
            {errors?.name?.message && <Error>{errors.name.message}</Error>}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <label className=" basis-1/3 font-semibold">Maximum capacity</label>
          <input
            {...register("maxCapacity", { required: "این فیلد اجباری است" })}
            className=" basis-1/3 border border-zinc-300 py-1 rounded-sm px-1.5"
            type="text"
          />
          <div className="basis-1/3">
            {errors?.maxCapacity?.message && (
              <Error>{errors.maxCapacity.message}</Error>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <label className=" basis-1/3 font-semibold">Regular price</label>
          <input
            {...register("reqularprice", { required: "این فیلد اجباری است" })}
            className=" basis-1/3 border border-zinc-300 py-1 rounded-sm px-1.5"
            type="number"
          />
          <div className="basis-1/3">
            {errors?.reqularprice?.message && (
              <Error>{errors.reqularprice.message}</Error>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <label className=" basis-1/3 font-semibold">Discount</label>
          <input
            defaultValue={0}
            {...register("discount")}
            className=" basis-1/3 border border-zinc-300 py-1 rounded-sm px-1.5"
            type="number"
          />
          <div className="basis-1/3">
            {errors?.discount?.message && (
              <Error>{errors.discount.message}</Error>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <label className=" basis-1/3 font-semibold">
            Description for website
          </label>
          <textarea
            {...register("description", { required: "این فیلد اجباری است" })}
            className=" basis-1/3 border border-zinc-300 py-1 rounded-sm px-1.5"
            type="textarea"
          />
          <div className="basis-1/3">
            {errors?.description?.message && (
              <Error>{errors.description.message}</Error>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <label className=" basis-1/3 font-semibold">cabin photo</label>
          <input
            accept="image/*"
            required={!isEditing}
            onChange={handleImageChane}
            className=" basis-1/3 border border-zinc-300 py-1 rounded-sm px-1.5"
            type="file"
          />
          <div className="basis-1/3">
            {errors?.image?.message && <Error>{errors.image.message}</Error>}
          </div>
        </div>
      </div>
      <div className="space-x-2 text-end mt-2.5 ">
        <button
          onClick={() => onCloseModal?.()}
          type="reset"
          className="border border-zinc-300 py-1.5 px-4 rounded-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className=" cursor-pointer dark:bg-blue-900 bg-blue-600 px-3 py-2 rounded-sm text-zinc-50"
        >
          {wating ? "Edit cabin" : "Add cabin"}
        </button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
