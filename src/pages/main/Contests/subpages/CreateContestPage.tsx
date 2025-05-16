import { useCreateContestMutation } from "@/API/contestAPI";
import { useGetCuisineQuery } from "@/API/cuisineAPI";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";
import { Textarea } from "@/components/Textarea";
import { DietaryRestrictionList } from "@/pages/main/Recipes/components/DietaryRestrictionList";
import { ContestForm } from "@/types/contestTypes";
import { DietaryRestriction } from "@/types/recipeTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function CreateContestPage() {
  const navigate = useNavigate();
  const [dietaryRestriction, setDietaryRestriction] = useState<
    DietaryRestriction[] | null
  >(null);
  const { data: cuisineList } = useGetCuisineQuery();

  const [create] = useCreateContestMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContestForm>();

  const handleCreate = async (data: ContestForm) => {
    const { title, description, startDate, endDate, cuisineId } = data;
    const dietaryRestrictionId = dietaryRestriction?.map((x) => x.id) ?? [];
    try {
      const contest = await create({
        ...data,
        title,
        description,
        startDate: startDate.slice(0, 10),
        endDate: endDate.slice(0, 10),
        dietaryRestrictionIdList: dietaryRestrictionId,
        cuisineId,
      });
      console.log(contest);
    } catch {
      return;
    }
    navigate("/contests", { replace: true });
  };

  return (
    <form
      id="contest-form"
      onSubmit={handleSubmit(handleCreate)}
      className="flex flex-col items-start justify-center px-5 py-4 gap-10 rounded-xl bg-gray-100"
    >
      <Input<ContestForm>
        name="title"
        register={register}
        errors={errors}
        label="Название конкурса"
        placeholder="Введите название"
        width="786"
        height="60"
      />
      <Textarea<ContestForm>
        name="description"
        register={register}
        errors={errors}
        label="Описание конкурса"
        placeholder="Введите описание"
        width="786"
        height="216"
      />
      <div className="flex gap-10">
        <CustomDatePicker<ContestForm>
          name="startDate"
          control={control}
          label="Дата начала"
        />
        <CustomDatePicker<ContestForm>
          name="endDate"
          control={control}
          label="Дата конца"
        />
      </div>
      <DietaryRestrictionList
        dietaryRestriction={dietaryRestriction}
        setDietaryRestriction={setDietaryRestriction}
      />
      <SelectInput<ContestForm>
        name="cuisineId"
        register={register}
        errors={errors}
        label={"Тип кухни"}
        options={cuisineList ?? []}
      />
      <button
        form="contest-form"
        type="submit"
        className="flex justify-start items-start py-1 px-3 bg-blue-200 rounded-xl cursor-pointer text-xl font-normal text-black hover:bg-blue-300"
      >
        Создать
      </button>
    </form>
  );
}
