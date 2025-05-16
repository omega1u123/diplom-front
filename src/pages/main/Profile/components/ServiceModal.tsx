import { useCreateOrderMutation } from "@/API/userAPI";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { OrderForm, PaidService } from "@/types/userTypes";
import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface ServiceModalProps {
  userId: string;
  service: PaidService | null;
  setService: Dispatch<SetStateAction<PaidService | null>>;
}

export const ServiceModal = forwardRef<HTMLDialogElement, ServiceModalProps>(
  ({ service, setService, userId }, ref) => {
    const [isStepTwo, setIsStepTwo] = useState<boolean>(false);
    const handleToggle = () => {
      setIsStepTwo((prev) => !prev);
    };
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<OrderForm>();

    const [create] = useCreateOrderMutation();

    const handleCreate = async (data: OrderForm) => {
      const { phoneNumber, email, description } = data;
      try {
        await create({ userId, phoneNumber, email, description });
        if (ref && "current" in ref && ref.current) {
          ref.current.close();
        }
      } catch {
        return;
      }
    };
    return (
      <dialog
        ref={ref}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] rounded-lg shadow-lg bg-white  backdrop:bg-black/50"
        onClick={(e) => {
          if (
            ref &&
            "current" in ref &&
            ref.current &&
            e.target === ref.current
          ) {
            ref.current.close();
            setService(null);
            setIsStepTwo(false);
          }
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (ref && "current" in ref && ref.current) {
              ref.current.close();
            }
          }}
          className="text-2xl cursor-pointer absolute -top-1 right-1 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {isStepTwo ? (
          <form
            id="order-form"
            onSubmit={handleSubmit(handleCreate)}
            className="flex flex-col items-center h-full py-4 gap-3"
          >
            <h2 className="text-2xl font-semibold text-black">
              Данные для связи
            </h2>
            <Input<OrderForm>
              name="email"
              register={register}
              validation={{ required: "Почта обязательна" }}
              label="Электронная почта"
              placeholder="Введите почту"
              errors={errors}
            />
            <Input<OrderForm>
              name="phoneNumber"
              register={register}
              validation={{ required: "Номер телефона обязателен" }}
              label="Номер телефона"
              placeholder="Введите номер"
              errors={errors}
            />
            <Textarea<OrderForm>
              name="description"
              register={register}
              validation={{ required: "Комментарий обязателен" }}
              label="Коммментарий"
              placeholder="Введите комментарий"
              errors={errors}
            />
            <div className="flex gap-2">
              <button
                form="order-form"
                type="submit"
                className="px-2.5 h-10 rounded-xl bg-blue-700 cursor-pointer text-2xl font-medium text-white hover:bg-blue-800"
              >
                Отправить
              </button>
              <button
                type="button"
                onClick={() => {
                  if (ref && "current" in ref && ref.current) {
                    ref.current.close();
                    setIsStepTwo(false);
                    reset();
                  }
                }}
                className="px-2.5 h-10 rounded-xl bg-red-700 cursor-pointer text-2xl font-medium text-white hover:bg-red-800"
              >
                Отменить
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-3 justify-start items-start py-4 px-20">
            <h2 className="text-2xl font-semibold text-black">
              {service?.title}
            </h2>
            <p className="text-xl font-normal text-black">
              {service?.description}
            </p>
            <button
              onClick={handleToggle}
              className="flex justify-center items-center py-1 px-2.5 bg-blue-700 rounded-xl cursor-pointer text-xl font-normal text-white hover:bg-blue-800"
            >
              Подать заявку
            </button>
          </div>
        )}
      </dialog>
    );
  }
);
