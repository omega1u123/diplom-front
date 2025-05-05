import AuthPage from "@/pages/auth/AuthPage";
import LoginForm from "@/pages/auth/components/LoginForm";
import RegisterForm from "@/pages/auth/components/RegisterForm";
import { routesNames } from "@/utils/routesNames";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          { path: routesNames.authLogin, element: <LoginForm /> },
          { path: routesNames.authRegister, element: <RegisterForm /> },
        ],
      },
    ],
  },
]);
export default router;
