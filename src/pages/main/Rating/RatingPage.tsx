import { Outlet } from "react-router-dom";

export default function RatingPage() {
  return (
    <div className="flex justify-center items-center">
      <Outlet />
    </div>
  );
}
