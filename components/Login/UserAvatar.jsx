"use client";
import { useUser } from "@/src/features/auth/useUser";
import Spinner from "../Spinner";

function UserAvatar() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  const { fullName, avatar } = user;

  return (
    <div className="flex gap-2.5 items-center font-medium">
      <img
        className="block w-8 h-8 aspect-square object-cover object-top rounded-full outline outline-2 outline-gray-100"
        src={avatar || "/default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
