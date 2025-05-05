import AuthHeader from "@/pages/auth/components/AuthHeader";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <main className="flex flex-col w-full h-screen">
      <AuthHeader />
      <section className="flex justify-center items-center w-full h-full bg-amber-50">
        <Outlet />
      </section>
    </main>
  );
}
