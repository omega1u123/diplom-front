import { useGetCuisineQuery } from "@/API/cuisineAPI";
import { useGetDietaryRestrictionsQuery } from "@/API/dietaryRestrictionAPI";
import { useGetIngredientByNameQuery } from "@/API/ingredientAPI";
import { RecipeFilterCard } from "@/pages/main/Recipes/components/RecipeFilterCard";
import { RecipeMultiFilterCard } from "@/pages/main/Recipes/components/RecipeMultiFilterCard";
import {
  Complexity,
  Cuisine,
  DietaryRestriction,
  IRecipeFilter,
} from "@/types/recipeTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface RecipeFilterProps {
  filter: Dispatch<SetStateAction<Partial<IRecipeFilter>>>;
}

const complexityList: Complexity[] = [
  {
    id: "1",
    name: "Легкая",
    value: 0,
  },
  {
    id: "2",
    name: "Средняя",
    value: 1,
  },
  {
    id: "3",
    name: "Сложная",
    value: 2,
  },
];

export const RecipeFilter = ({ filter }: RecipeFilterProps) => {
  const [selectedRestrictions, setSelectedRestriction] = useState<
    DietaryRestriction[]
  >([]);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine | null>(null);
  const [selectedComplexity, setSelectedComplexity] =
    useState<Complexity | null>(null);
  const { data: Restrictions } = useGetDietaryRestrictionsQuery();
  const { data: Cuisines } = useGetCuisineQuery();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientName, setIngredientName] = useState<string>("");
  const { data: Ingredient } = useGetIngredientByNameQuery(ingredientName);

  useEffect(() => {
    filter({
      dietaryRestrictionList: selectedRestrictions.map((x) => x.name),
      ingredientList: selectedIngredients,
      cuisine: selectedCuisine?.name,
      complexity: selectedComplexity?.value,
    });
  }, [
    filter,
    selectedRestrictions,
    selectedIngredients,
    selectedCuisine,
    selectedComplexity,
  ]);

  return (
    <div className="flex flex-col justify-start items-center w-[273px]  px-1.5 py-2 gap-2 border-[1px] border-gray-200 rounded-xl">
      <h1 className="text-xl font-normal text-black">Фильтр</h1>
      {/* Restrictions */}
      <RecipeMultiFilterCard<DietaryRestriction>
        name={"Диетические ограничения"}
        data={Restrictions}
        state={selectedRestrictions}
        setState={setSelectedRestriction}
      />
      {/* Cuisine */}
      <RecipeFilterCard<Cuisine>
        name={"Тип кухни"}
        data={Cuisines}
        state={selectedCuisine}
        setState={setSelectedCuisine}
      />
      <div className="flex flex-col justify-start items-center w-full px-1.5 py-2 border-[1px] border-gray-200 rounded-xl">
        <h2 className="text-[17px] font-normal text-black mb-2">Ингредиенты</h2>
        <input
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder="Введите название"
          className="px-2 w-[222px] h-[28px] bg-gray-200 rounded-xl text-xs font-normal mb-2 text-black placeholder:text-xs"
        />

        {Ingredient && (
          <div
            onClick={() => {
              if (selectedIngredients.includes(Ingredient.name)) {
                setSelectedIngredients((prev) =>
                  prev.filter((name) => name !== Ingredient.name)
                );
              } else {
                setSelectedIngredients((prev) => [...prev, Ingredient.name]);
              }
            }}
            className={`flex justify-start items-center w-[222px] h-[28px] px-1.5 rounded-xl text-[12px] font-normal text-black cursor-pointer ${
              selectedIngredients.includes(Ingredient.name)
                ? "bg-blue-200"
                : "border-[1px] border-gray-200 hover:bg-gray-100"
            }`}
          >
            {Ingredient.name}
          </div>
        )}

        {/* Display Selected Ingredients */}
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedIngredients.map((name) => (
            <div
              key={name}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
            >
              {name}
              <button
                type="button"
                onClick={() =>
                  setSelectedIngredients((prev) =>
                    prev.filter((item) => item !== name)
                  )
                }
                className="font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Complexity */}
      <RecipeFilterCard<Complexity>
        name={"Сложность"}
        data={complexityList}
        state={selectedComplexity}
        setState={setSelectedComplexity}
      />
    </div>
  );
};
