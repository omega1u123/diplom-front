import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface TextareaProps<T extends FieldValues> {
  name?: Path<T>;
  register?: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T>;
  label?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  rounded?: string;
  textSize?: string;
  rows?: number;
}

export const Textarea = <T extends FieldValues>({
  name,
  register,
  validation,
  errors,
  label,
  placeholder,
  width = "339",
  height = "100",
  rounded = "12",
  textSize = "20",
  rows = 4,
}: TextareaProps<T>) => {
  const errorMessage = name && (errors?.[name]?.message as string);
  return (
    <div className="flex flex-col items-start">
      <p
        className={`font-normal text-black`}
        style={{ fontSize: `${textSize}px` }}
      >
        {label}
      </p>
      <textarea
        placeholder={placeholder}
        rows={rows}
        {...(register && name ? register(name, validation) : {})}
        className={`px-1 border-[1px] border-[#D9D9D9] rounded-[${rounded}px] px-3 placeholder:text-sm placeholder:text-gray-400 placeholder:text-left`}
        style={{
          width: `${width}px`,
          minHeight: `${height}px`,
          maxHeight: `${height}px`,
          fontSize: `${textSize}px`,
          textAlign: "left",
          lineHeight: "1",
          paddingTop: "4px",
        }}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
