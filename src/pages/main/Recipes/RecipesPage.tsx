import React from "react";
import { Outlet } from "react-router-dom";

export default function RecipesPage() {
  return (
    <div className="flex justify-center items-center">
      <Outlet />
    </div>
  );
}
