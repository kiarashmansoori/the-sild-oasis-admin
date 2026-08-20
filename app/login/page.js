import LoginForm from "@/components/Login/LoginForm";
import Logo from "@/components/Logo";

function Page() {
  return (
    <main className="grid grid-cols-[27rem] grid-rows-[auto_auto_auto]  content-center justify-center min-h-screen dark:bg-zinc-900 bg-gray-50">
      <Logo />
      <h4 className="text-center py-6 font-semibold text-2xl">
        Log in to your account
      </h4>
      <LoginForm />
    </main>
  );
}

export default Page;
