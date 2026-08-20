import HeaderMenu from "./HeaderMenu";
import UserAvatar from "@/components/Login/UserAvatar";
function Header() {
  return (
    <div className="py-5 px-8 bg-white dark:bg-zinc-900  border-b border-zinc-100 dark:border-zinc-600 flex items-center justify-end gap-6">
      <UserAvatar />
      <HeaderMenu />
    </div>
  );
}

export default Header;
