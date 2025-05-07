import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function MainPage() {
  return (
    <main className="flex flex-col w-full h-screen">
      <Header />
      <Outlet />
    </main>
  );
}
