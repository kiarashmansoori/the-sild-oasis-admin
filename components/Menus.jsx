"use client";

import { useOusideClick } from "@/hooks/useOusideClick";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

const MenueContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenueContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenueContext.Provider>
  );
}
function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}
function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenueContext);
  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x + 8,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <button onClick={handleClick} className="p-1.5">
      <HiEllipsisVertical size={23} />
    </button>
  );
}

function List({ children, id }) {
  const { openId, position, close } = useContext(MenueContext);
  const ref = useOusideClick(close);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{
        right: `${position.x}px`,
        top: `${position.y}px`,
      }}
      className="fixed bg-white  shadow-2xl rounded-lg p-1.5"
    >
      {children}
    </ul>,
    document.body,
  );
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenueContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <button
        onClick={handleClick}
        className="w-full text-left px-3 py-1 flex items-center gap-5 text-gray-700 hover:bg-gray-100"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
