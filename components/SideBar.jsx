import Logo from "./Logo";
import Navbar from "./Navbar";

function SideBar() {
  return (
    <aside className=" row-span-full  py-9 border-r border-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 space-y-7 ">
      <Logo />
      <Navbar />
    </aside>
  );
}

export default SideBar;
