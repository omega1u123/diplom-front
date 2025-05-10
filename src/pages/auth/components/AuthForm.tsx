import { useForm } from "react-hook-form";

export interface IFormValues {
  login: string;
  password: string;
}

interface AuthFormProps {
  submit: (data: IFormValues) => void;
}

const AuthForm = ({ submit }: AuthFormProps) => {
  const { register, handleSubmit } = useForm<IFormValues>();
  return (
    <form
      id="auth-form"
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-7 w-[496px]"
    >
      <div className="flex flex-col items-start justify-center">
        <p className="text-xl font-normal text-black">Логин</p>
        <input
          {...register("login", { required: true })}
          className="flex justify-start items-center px-2.5 w-[496px] h-11 border-[1px] border-gray-400 rounded-[12px]"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <p className="text-xl font-normal text-black">Пароль</p>
        <input
          {...register("password", { required: true })}
          className="flex justify-start items-center px-2.5 w-[496px] h-11 border-[1px] border-gray-400 rounded-[12px]"
        />
      </div>
    </form>
  );
};

export default AuthForm;
