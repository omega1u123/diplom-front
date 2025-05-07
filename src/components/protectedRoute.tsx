import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHooks";

export const ProtectedRoute: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
