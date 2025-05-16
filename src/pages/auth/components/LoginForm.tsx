import { useAuth } from "@/hooks/useAuth";
import AuthForm, { IFormValues } from "@/pages/auth/components/AuthForm";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const submit = (data: IFormValues) => {
    const { login, password } = data;
    auth({ userName: login, password });
    navigate("/recipes");
  };
  return (
    <div className="flex flex-col justify-center items-center w-3xl h-[28rem] gap-10 bg-white border-[1px] border-gray-400 rounded-[12px]">
      <h2 className="text-4xl font-bold text-black">Вход</h2>
      <AuthForm submit={submit} />
      <div className="flex flex-col justify-center items-center gap-3">
        <button
          type="submit"
          form="auth-form"
          className="w-3xs h-11 border-[1px] cursor-pointer hover:bg-gray-100"
        >
          Войти
        </button>
        <Link to={"/auth/register"} className="text-sm">
          Нет аккаунта? Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
