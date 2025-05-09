import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface SelectInputProps<T extends FieldValues> {
  name?: Path<T>;
  register?: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  options: { label: string }[];
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
  options,
  width = "339",
  height = "44",
  rounded = "12",
  textSize = "20",
}: SelectInputProps<T>) => {
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
        {options.map((option, index) => (
          <option key={index}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};
