"use client";
import { useOusideClick } from "@/hooks/useOusideClick";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOusideClick(close);
  if (name !== openName) return;
  return createPortal(
    <div className=" fixed top-0 left-0 w-full h-screen backdrop-blur-sm z-50">
      <div
        ref={ref}
        className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:border dark:border-zinc-500 dark:bg-zinc-700 rounded-xl px-8 py-10 transition-all "
      >
        <button onClick={close} className="top-3 absolute right-2.5">
          <HiXMark size={22} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
