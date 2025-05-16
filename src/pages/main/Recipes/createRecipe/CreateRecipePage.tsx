import { useGetCuisineQuery } from "@/API/cuisineAPI";
import { useFetchMediaMutation } from "@/API/mediaAPI";
import { useCreateRecipeMutation } from "@/API/recipeAPI";
import { ImageUpload } from "@/components/ImageUpload";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";
import { Textarea } from "@/components/Textarea";
import { useAppSelector } from "@/hooks/reduxHooks";
import { DietaryRestrictionList } from "@/pages/main/Recipes/components/DietaryRestrictionList";
import { IngredientList } from "@/pages/main/Recipes/components/IngredientList";
import { RecipeStepList } from "@/pages/main/Recipes/components/RecipeStepList";
import {
  DietaryRestriction,
  Ingredient,
  RecipeForm,
  RecipeStep,
} from "@/types/recipeTypes";
import { uploadFileToMinio } from "@/utils/uploadToMinio";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateRecipePage() {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [recipeSteps, setRecipeSteps] = useState<RecipeStep[] | null>(null);
  const [dietaryRestriction, setDietaryRestriction] = useState<
    DietaryRestriction[] | null
  >(null);

  const [create] = useCreateRecipeMutation();
  const [fetchMedia] = useFetchMediaMutation();
  const { data: cuisineList } = useGetCuisineQuery();

  const handleImageSelect = (file: File | null, previewUrl: string | null) => {
    setImage(file);
    setPreviewUrl(previewUrl);
  };
  const { register, handleSubmit } = useForm<RecipeForm>();
  const handleSubmitButton = async (data: RecipeForm) => {
    const isPublic = data.isPublic === "true";
    const ingredientsId = ingredients?.map((x) => x.id) ?? [];
    const recipeStepsId = recipeSteps?.map((x) => x.id) ?? [];
    const dietaryRestrictionId = dietaryRestriction?.map((x) => x.id) ?? [];
    console.log(image, image?.type);
    if (!image) return;
    let fileUrl = "";
    try {
      fileUrl = await fetchMedia(image).unwrap();
      await uploadFileToMinio(image, fileUrl);
      console.log(fileUrl);
    } catch {
      return;
    }

    try {
      const Recipe = await create({
        ...data,
        cookingTime: Number(data.cookingTime),
        complexity: Number(data.complexity),
        proteins: Number(data.proteins),
        fats: Number(data.fats),
        carb: Number(data.carb),
        calories: Number(data.calories),
        userId,
        ingredientIdList: ingredientsId,
        recipeStepIdList: recipeStepsId,
        dietaryRestrictionIdList: dietaryRestrictionId,
        fileUrl,
        isPublic,
      });
      navigate("/recipes", { replace: true });
      console.log(Recipe);
    } catch {
      return;
    }
    console.log("nice");
  };

  return (
    <section className="flex flex-col justify-center items-center h-full w-full gap-[34px] py-10">
      <form
        id="recipe-form"
        onSubmit={handleSubmit(handleSubmitButton)}
        className="flex flex-col justify-center items-center h-full w-full gap-[34px]"
      >
        <div className="flex justify-center gap-[34px]">
          <div className="flex justify-center items-center w-[767px] h-[773px] bg-gray-300">
            <ImageUpload
              onImageSelect={handleImageSelect}
              preview={previewUrl}
            />
          </div>
          <div className="flex flex-col justify-start items-start py-8 px-14 w-[470px] min-h-[628px] gap-6 rounded-[12px] bg-gray-200">
            <Input<RecipeForm>
              name="name"
              register={register}
              label={"Название"}
            />
            <div className="flex flex-col items-start">
              <p
                className="font-normal text-black"
                style={{ fontSize: `20px` }}
              >
                Сложность
              </p>
              <select
                {...register("complexity")}
                className={`flex justify-start px-1 border-[1px] border-[#D9D9D9] rounded-[12px]`}
                style={{ width: `339px`, height: `44px` }}
              >
                <option key="none" value="">
                  Выберите опцию
                </option>
                {[
                  { id: "1", name: "Легкий", value: 0 },
                  { id: "2", name: "Средний", value: 1 },
                  { id: "2", name: "Сложный", value: 2 },
                ].map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <DietaryRestrictionList
              dietaryRestriction={dietaryRestriction}
              setDietaryRestriction={setDietaryRestriction}
            />
            <SelectInput<RecipeForm>
              name="cuisineId"
              register={register}
              label={"Тип кухни"}
              options={cuisineList ?? []}
            />
            <Input<RecipeForm>
              name="cookingTime"
              register={register}
              label={"Время приготовления, мин"}
            />
            <div className="flex gap-10">
              <div className="flex flex-col gap-3">
                <Input<RecipeForm>
                  name="proteins"
                  register={register}
                  label={"Белки, гр"}
                  textSize="15"
                  width="136"
                  height="27"
                />
                <Input<RecipeForm>
                  name="fats"
                  register={register}
                  label={"Жиры, гр"}
                  textSize="15"
                  width="136"
                  height="27"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Input<RecipeForm>
                  name="carb"
                  register={register}
                  label={"Углеводы, гр"}
                  textSize="15"
                  width="136"
                  height="27"
                />
                <Input<RecipeForm>
                  name="calories"
                  register={register}
                  label={"Калории, ккал"}
                  textSize="15"
                  width="136"
                  height="27"
                />
              </div>
            </div>
            {/* Select */}
            <div className="flex flex-col items-start">
              <p
                className="font-normal text-black"
                style={{ fontSize: `20px` }}
              >
                Доступ
              </p>
              <select
                {...register("isPublic")}
                className={`flex justify-start px-1 border-[1px] border-[#D9D9D9] rounded-[12px]`}
                style={{ width: `339px`, height: `44px` }}
              >
                <option key="none" value="">
                  Выберите опцию
                </option>
                {[
                  { id: "1", name: "Платный", value: "false" },
                  { id: "2", name: "Бесплатный", value: "true" },
                ].map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Select */}
            <button
              type="submit"
              form="recipe-form"
              className="flex justify-center items-center w-36 h-9 rounded-xl bg-[#C9DCFF] text-xl font-normal text-black cursor-pointer hover:bg-[#B0CFFF]"
            >
              Сохранить
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-[1272px] min-h-[300px] py-3 px-4 rounded-[12px] bg-gray-200">
          <Textarea<RecipeForm>
            name="description"
            register={register}
            width="1236"
            height="150"
            placeholder="Введите описание"
          />
          <IngredientList
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <RecipeStepList
            recipeSteps={recipeSteps}
            setRecipeSteps={setRecipeSteps}
          />
        </div>
      </form>
    </section>
  );
}
