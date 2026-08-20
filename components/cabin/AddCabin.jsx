"use client";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <button className="w-full bg-blue-600 dark:bg-zinc-900 text-zinc-50 rounded-sm mt-2.5 py-2.5 cursor-pointer">
          Add new cabin
        </button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
