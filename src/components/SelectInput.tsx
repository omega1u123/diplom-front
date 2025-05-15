import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface SelectInputProps<T extends FieldValues> {
  name?: Path<T>;
  register?: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T>;
  options: { id: string; name: string }[];
  label: string;
  width?: string;
  height?: string;
  rounded?: string;
  textSize?: string;
}

export const SelectInput = <T extends FieldValues>({
  label,
  name,
  register,
  validation,
  errors,
  options,
  width = "339",
  height = "44",
  rounded = "12",
  textSize = "20",
}: SelectInputProps<T>) => {
  const errorMessage = name && (errors?.[name]?.message as string);
  return (
    <div className="flex flex-col items-start">
      <p
        className="font-normal text-black"
        style={{ fontSize: `${textSize}px` }}
      >
        {label}
      </p>
      <select
        {...(register && name ? register(name, validation) : {})}
        className={`flex justify-start px-1 border-[1px] border-[#D9D9D9] rounded-[${rounded}px]`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <option key="none" value="null">
          Выберите опцию
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            defaultValue={options.length > 0 ? options[0].id : ""}
          >
            {option.name}
          </option>
        ))}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </select>
    </div>
  );
};
