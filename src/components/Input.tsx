import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { useState } from "react";

interface InputProps<T extends FieldValues> {
  name?: Path<T>;
  inputType?: string;
  register?: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T>;
  label?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  rounded?: string;
  textSize?: string;
}

export const Input = <T extends FieldValues>({
  name,
  register,
  validation,
  errors,
  inputType = "text",
  label,
  placeholder,
  width = "339",
  height = "44",
  rounded = "12",
  textSize = "20",
}: InputProps<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const errorMessage = name && (errors?.[name]?.message as string);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => (prev === false ? true : false));
  };

  return (
    <div className="flex flex-col items-start relative">
      <p
        className={`font-normal text-black`}
        style={{ fontSize: `${textSize}px` }}
      >
        {label}
      </p>

      <div className="relative w-full">
        <input
          type={
            inputType === "password" && isPasswordVisible ? "text" : inputType
          }
          placeholder={placeholder}
          {...(register && name ? register(name, validation) : {})}
          className={`w-full px-3 border-[1px] border-[#D9D9D9] rounded-[${rounded}px] placeholder:text-sm placeholder:text-gray-400`}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
        {inputType === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? (
              <div className="size-4 rounded-full bg-red-200 cursor-pointer hover:bg-red-300"></div>
            ) : (
              <div className="size-4 rounded-full bg-blue-200 cursor-pointer hover:bg-blue-300"></div>
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
