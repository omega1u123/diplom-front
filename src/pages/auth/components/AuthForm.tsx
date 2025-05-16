import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";

export interface IFormValues {
  login: string;
  password: string;
}

interface AuthFormProps {
  submit: (data: IFormValues) => void;
}

const AuthForm = ({ submit }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();
  return (
    <form
      id="auth-form"
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-7 w-[496px]"
    >
      <Input<IFormValues>
        name="login"
        label="Логин"
        placeholder="Введите логин"
        register={register}
        validation={{ required: "Логин обязателен" }}
        errors={errors}
      />
      <Input<IFormValues>
        inputType="password"
        name="password"
        label="Пароль"
        placeholder="Введите пароль"
        register={register}
        validation={{ required: "Пароль обязателен" }}
        errors={errors}
      />
    </form>
  );
};

export default AuthForm;
