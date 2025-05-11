import { useFilterRecipeQuery } from "@/API/recipeAPI";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { RecipeCard } from "@/pages/main/Recipes/components/RecipeCard";
import { RecipeFilter } from "@/pages/main/Recipes/components/RecipeFilter";
import { setRecipes } from "@/store/slices/recipeSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRecipeFilter } from "./../../../../types/recipeTypes";

export default function ShowRecipesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const recipes = useAppSelector((state) => state.recipe.recipes);
  const [filter, setFilter] = useState<Partial<IRecipeFilter>>({
    dietaryRestrictionList: null,
    ingredientList: null,
    cuisine: null,
    complexity: 0,
  });
  const request = {
    dietaryRestrictionList: filter.dietaryRestrictionList,
    ingredientList: filter.ingredientList,
    cuisine: filter.cuisine,
    complexity: filter.complexity,
    page: 1,
    pageSize: 9999,
  };
  const { data, isLoading } = useFilterRecipeQuery(request);

  useEffect(() => {
    if (data) {
      dispatch(setRecipes(data));
    }
  }, [data, dispatch]);

  const handleCreateLink = () => {
    navigate("/recipes/create");
  };

  return (
    <section className="w-full py-2.5 px-5">
      {/* Top section */}
      <div className="flex justify-end mb-2.5">
        <button
          type="button"
          onClick={handleCreateLink}
          className="text-xl font-semibold text-white flex justify-center items-center px-8 py-3 rounded-xl bg-blue-700 cursor-pointer hover:bg-blue-800"
        >
          Создать рецепт
        </button>
      </div>
      {/* Main section */}
      <div className="flex gap-5">
        {/* Filter */}
        <div>
          <RecipeFilter filter={setFilter} />
        </div>
        {/* Recipes */}
        <div className="flex flex-wrap justify-start items-start gap-5">
          {isLoading ? (
            <div>Загрузка</div>
          ) : (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
