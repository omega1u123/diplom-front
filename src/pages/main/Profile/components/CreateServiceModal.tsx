import { useCreateServiceMutation } from "@/API/userAPI";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { PaidServiceForm } from "@/types/userTypes";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";

interface CreateServiceModalProps {
  userId: string;
}

export const CreateServiceModal = forwardRef<
  HTMLDialogElement,
  CreateServiceModalProps
>(({ userId }, ref) => {
  const [create] = useCreateServiceMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaidServiceForm>();

  const handleCreate = async (data: PaidServiceForm) => {
    try {
      await create({
        userId,
        title: data.title,
        description: data.description,
      });
    } catch {
      return;
    }
  };

  return (
    <dialog
      ref={ref}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] py-6 rounded-lg shadow-lg bg-white  backdrop:bg-black/50"
      onClick={(e) => {
        if (
          ref &&
          "current" in ref &&
          ref.current &&
          e.target === ref.current
        ) {
          ref.current.close();
        }
      }}
    >
      <form
        id="service-form"
        onSubmit={handleSubmit(handleCreate)}
        className="flex flex-col items-center h-full gap-3"
      >
        <Input<PaidServiceForm>
          name="title"
          register={register}
          validation={{ required: "Название обязательно" }}
          label="Название услуги"
          placeholder="Введите название"
          errors={errors}
        />
        <Textarea<PaidServiceForm>
          name="description"
          register={register}
          validation={{ required: "Описание обязательно" }}
          label="Описание"
          placeholder="Введите описание"
          errors={errors}
        />
        <div className="flex gap-2">
          <button
            form="service-form"
            type="submit"
            className="px-2.5 h-10 rounded-xl bg-blue-700 cursor-pointer text-2xl font-medium text-white hover:bg-blue-800"
          >
            Создать
          </button>
          <button
            type="button"
            onClick={() => {
              if (ref && "current" in ref && ref.current) {
                ref.current.close();
              }
            }}
            className="px-2.5 h-10 rounded-xl bg-red-700 cursor-pointer text-2xl font-medium text-white hover:bg-red-800"
          >
            Отмена
          </button>
        </div>
      </form>
    </dialog>
  );
});
