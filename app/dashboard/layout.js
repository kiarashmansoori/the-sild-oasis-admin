import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <Suspense fallback={null}>
      <div className="grid h-screen grid-cols-[19rem_1fr] grid-rows-[auto_1fr] ">
        <Toaster gutter={12} />
        <Header />
        <SideBar />
        <main className=" overflow-scroll px-16 py-12 bg-zinc-50 dark:bg-zinc-800">
          {children}
        </main>
      </div>
    </Suspense>
  );
}
