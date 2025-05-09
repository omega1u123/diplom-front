import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name?: Path<T>;
  inputType?: string;
  register?: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
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
  inputType = "text",
  label,
  placeholder,
  width = "339",
  height = "44",
  rounded = "12",
  textSize = "20",
}: InputProps<T>) => {
  return (
    <div className="flex flex-col items-start">
      <p
        className={`font-normal text-black`}
        style={{ fontSize: `${textSize}px` }}
      >
        {label}
      </p>
      <input
        type={inputType}
        placeholder={placeholder}
        {...(register && name ? register(name, validation) : {})}
        className={`flex justify-start px-1 border-[1px] border-[#D9D9D9] rounded-[${rounded}px] placeholder:text-sm placeholder:text-gray-400`}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
};
