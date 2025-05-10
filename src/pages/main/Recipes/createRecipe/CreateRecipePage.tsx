import { useGetCuisineQuery } from "@/API/cuisineAPI";
import { useFetchMediaMutation } from "@/API/mediaAPI";
import { useCreateRecipeMutation } from "@/API/recipeAPI";
import { ImageUpload } from "@/components/ImageUpload";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";
import { Textarea } from "@/components/Textarea";
import { DietaryRestrictionList } from "@/pages/main/Recipes/components/DietaryRestrictionList";
import { IngredientList } from "@/pages/main/Recipes/components/IngredientList";
import { RecipeStepList } from "@/pages/main/Recipes/components/RecipeStepList";
import {
  DietaryRestriction,
  Ingredient,
  RecipeForm,
  RecipeStep,
} from "@/types/recipeTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateRecipePage() {
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
    // const {
    //   name,
    //   complexity,
    //   cuisineId,
    //   cookingTime,
    //   proteins,
    //   fats,
    //   carb,
    //   calories,
    //   description,
    // } = data;
    const ingredientsId = ingredients?.map((x) => x.id) ?? [];
    const recipeStepsId = recipeSteps?.map((x) => x.id) ?? [];
    const dietaryRestrictionId = dietaryRestriction?.map((x) => x.id) ?? [];

    if (!image) return;
    let fileUrl = "";
    try {
      fileUrl = await fetchMedia(image).unwrap();
    } catch {
      return;
    }

    try {
      await create({
        ...data,
        ingredientIdList: ingredientsId,
        recipeStepIdList: recipeStepsId,
        dietaryRestrictionIdList: dietaryRestrictionId,
        fileUrl,
      });
    } catch {
      return;
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-full w-full gap-[34px] py-10">
      <form
        id="recipe-form"
        onSubmit={handleSubmit(handleSubmitButton)}
        className="flex flex-col justify-center items-center h-full w-full gap-[34px]"
      >
        <div className="flex justify-center gap-[34px]">
          <div className="flex justify-center items-center w-[767px] h-[628px] bg-gray-300">
            <ImageUpload
              onImageSelect={handleImageSelect}
              preview={previewUrl}
            />
          </div>
          <div className="flex flex-col justify-start items-start py-8 px-14 w-[470px] h-[628px] gap-6 rounded-[12px] bg-gray-200">
            <Input<RecipeForm>
              name="name"
              register={register}
              label={"Название"}
            />
            <Input<RecipeForm>
              name="complexity"
              register={register}
              label={"Сложность"}
            />
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
            <button
              type="submit"
              form="recipe-form"
              className="flex justify-center items-center w-36 h-9 rounded-xl bg-[#C9DCFF] text-xl font-normal text-black cursor-pointer hover:bg-[#B0CFFF]"
            >
              Сохранить
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-[1272px] min-h-[467px] py-3 px-4 rounded-[12px] bg-gray-200">
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
