import UpdatePassword from "@/components/Login/UpdatePasswordForm";
import UpdateUserDataForm from "@/components/Login/UpdateUserDataForm";

function Page() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Update your account</h1>
        <UpdateUserDataForm />
      </div>
      <div>
        <h1 className="text-2xl mt-6 font-semibold">Update password</h1>
        <UpdatePassword />
      </div>
    </div>
  );
}

export default Page;
