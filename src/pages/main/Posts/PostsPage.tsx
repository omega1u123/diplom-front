import { Outlet } from "react-router-dom";

export default function PostsPage() {
  return (
    <div className="flex justify-center items-center">
      <Outlet />
    </div>
  );
}
