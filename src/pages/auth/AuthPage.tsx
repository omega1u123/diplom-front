import { useAppSelector } from "@/hooks/reduxHooks";
import AuthHeader from "@/pages/auth/components/AuthHeader";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/recipes");
    }
  }, [isAuth, navigate]);
  return (
    <main className="flex flex-col w-full h-screen">
      <AuthHeader />
      <section className="flex justify-center items-center w-full h-full bg-amber-50">
        <Outlet />
      </section>
    </main>
  );
}
