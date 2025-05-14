import { useGetSavedRecipesByUserIdQuery } from "@/API/recipeAPI";
import { RecipeCard } from "@/pages/main/Recipes/components/RecipeCard";
import { useParams } from "react-router-dom";

export default function ProfileSavedRecipePage() {
  const { id } = useParams();
  const { data: recipes, isLoading } = useGetSavedRecipesByUserIdQuery(id!);
  return (
    <div className="flex flex-wrap justify-start items-start gap-5">
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        recipes?.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      )}
      {recipes === null || recipes?.length === 0 ? (
        <div>
          <p>Нет сохраненных рецептов</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
