import { useGetPrivateRecipesByUserIdQuery } from "@/API/recipeAPI";
import { useGetIsPaidSubQuery } from "@/API/userAPI";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RecipeCard } from "@/pages/main/Recipes/components/RecipeCard";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfilePaidRecipePage() {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
  const { id } = useParams();
  const { data: isPaidSub } = useGetIsPaidSubQuery(
    {
      subscriberId: userId,
      targetUserId: id!,
    },
    { skip: userId === id || userId === "" }
  );
  const { data: recipes, isLoading } = useGetPrivateRecipesByUserIdQuery(id!, {
    skip: isPaidSub?.isSubscribed === false && id !== userId,
  });
  useEffect(() => {
    if (isPaidSub?.isSubscribed === false && id !== userId) {
      navigate("/recipes", { replace: true });
    }
  }, [isPaidSub, navigate, id, userId]);
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
