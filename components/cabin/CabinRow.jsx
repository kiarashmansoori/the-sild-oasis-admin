"use client";

import CreateCabinForm from "./CreateCabinForm";
import Image from "next/image";
import { useDeleteCabin } from "@/src/features/cabin/useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "@/src/features/cabin/useCreateCabin";
import Modal from "../Modal";

import Table from "../Table";
import Menus from "../Menus";
import { formatCurrency } from "@/utils/helpers";
import ConfirmDelete from "../ConfirmDelete";

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabinApi, isCreate } = useCreateCabin();

  function handleDuplicate() {
    createCabinApi({
      cabin: cabin,
      image: cabin.image,
    });
  }
  return (
    <>
      <Table.Row>
        <li>
          <Image
            src={cabin.image}
            alt={cabin.name}
            width={300}
            height={270}
            unoptimized
          />
        </li>
        <li>{cabin.name}</li>
        <li>Fits up to {cabin.maxCapacity} guests</li>
        <li>{formatCurrency(cabin.reqularprice)}</li>
        <li className="text-green-600">
          {cabin.discount ? `${formatCurrency(cabin.discount)}` : "_"}
        </li>
        <li>
          <div className="flex gap-1.5">
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={cabin._id} />
                <Menus.List id={cabin._id}>
                  <Menus.Button
                    onClick={() => handleDuplicate()}
                    icon={<HiSquare2Stack />}
                  >
                    Duplicate
                  </Menus.Button>
                  <Modal.Open opens="edit-cabin">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Modal.Open opens="delete">
                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>

                <Modal.Window name="edit-cabin">
                  <CreateCabinForm cabinToEdit={cabin} />
                </Modal.Window>

                <Modal.Window name="delete">
                  <ConfirmDelete
                    resourceName="Cabin"
                    disabled={isDeleting}
                    onConfirm={() => deleteCabin(cabin._id)}
                  />
                </Modal.Window>
              </Menus.Menu>
            </Modal>
          </div>
        </li>
      </Table.Row>
    </>
  );
}

export default CabinRow;
