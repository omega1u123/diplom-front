import DatePicker from "react-datepicker";
import {
  Controller,
  Control,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  label?: string;
  placeholder?: string;
}

export const CustomDatePicker = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  placeholder,
}: DatePickerProps<T>) => {
  const errorMessage = errors?.[name]?.message as string;

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              field.onChange(date ? date.toISOString().slice(0, 10) : "");
            }}
            placeholderText={placeholder || "Select a date"}
            className="border border-gray-200 rounded-xl px-3 py-2 w-full"
          />
        )}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
