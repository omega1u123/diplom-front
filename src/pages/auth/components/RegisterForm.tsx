import { useRegisterMutation } from "@/API/authAPI";
import AuthForm, { IFormValues } from "@/pages/auth/components/AuthForm";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const submit = async (data: IFormValues) => {
    const { login, password } = data;
    try {
      await register({ name: login, password }).unwrap();
    } catch {
      return;
    }
    navigate("/auth/login");
  };
  return (
    <div className="flex flex-col justify-center items-center w-3xl h-[28rem] gap-10 bg-white border-[1px] border-gray-400 rounded-[12px]">
      <h2 className="text-4xl font-bold text-black">Регистрация</h2>
      <AuthForm submit={submit} />
      <div className="flex flex-col justify-center items-center gap-3">
        <button
          type="submit"
          form="auth-form"
          className="w-3xs h-11 border-[1px] cursor-pointer hover:bg-gray-100"
        >
          Нажми меня
        </button>
        <Link to={"/auth/login"} className="text-sm">
          Уже зарегистрированы? Авторизоваться
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
