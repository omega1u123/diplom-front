import { useGetPublicRecipesByUserIdQuery } from "@/API/recipeAPI";
import { RecipeCard } from "@/pages/main/Recipes/components/RecipeCard";
import { useParams } from "react-router-dom";

export default function ProfileRecipePage() {
  const { id } = useParams();
  const { data: recipes, isLoading } = useGetPublicRecipesByUserIdQuery(id!);
  return (
    <div className="flex flex-wrap justify-start items-start gap-5">
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        recipes?.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      )}
      {recipes === null || recipes?.length === 0 ? (
        <div>
          <p>Нет рецептов</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
