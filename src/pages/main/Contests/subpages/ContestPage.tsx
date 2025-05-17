import { useGetContestByIdQuery, useGetWinnerQuery } from "@/API/contestAPI";
import { ContestRecipeCard } from "@/pages/main/Contests/components/ContestRecipeCard";
import { ContestRecipeModal } from "@/pages/main/Contests/components/ContestRecipeModal";
import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

export default function ContestPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetContestByIdQuery(id!);
  const { data: Winner } = useGetWinnerQuery(id!);
  const registerRecipeRef = useRef<HTMLDialogElement>(null);
  const openRegisterRecipeModal = () => {
    if (registerRecipeRef.current && !registerRecipeRef.current.open) {
      registerRecipeRef.current.showModal();
    }
  };

  const sortedRecipes = useMemo(() => {
    if (!data?.recipeList) return [];

    const recipeList = [...data.recipeList]; // Clone original list
    if (Winner?.recipeId) {
      const winnerIndex = recipeList.findIndex(
        (recipe) => recipe.id === Winner.recipeId
      );

      if (winnerIndex > -1) {
        const [winnerRecipe] = recipeList.splice(winnerIndex, 1);
        return [winnerRecipe, ...recipeList]; // Winner first
      }
    }
    return recipeList;
  }, [data?.recipeList, Winner]);
  return (
    <section className="flex flex-col items-start justify-start w-[1188px] min-h-[824px] p-10 gap-5 rounded-xl bg-gray-100">
      {isLoading ? (
        <p>Загрузка</p>
      ) : (
        <>
          <h1 className="text-[40px] font-semibold text-black">
            {data?.title}
          </h1>
          <p className="max-w-[850px] text-wrap text-2xl font-normal text-black">
            {data?.description}
          </p>
          {Array.isArray(data?.dietaryRestrictionList) &&
            data.dietaryRestrictionList.length > 0 && (
              <div className="flex gap-2.5">
                <p className="text-xl font-normal text-black">
                  Диетические ограничения
                </p>
                {data?.dietaryRestrictionList.map((x) => (
                  <div
                    key={x.id}
                    className="flex justify-center items-center py-1 px-2.5 bg-gray-200 rounded-xl "
                  >
                    <p className="text-base font-normal text-black">{x.name}</p>
                  </div>
                ))}
              </div>
            )}
          {data?.cuisine && (
            <p className="text-base font-normal text-black">
              Тип кухни: {data.cuisine.name}
            </p>
          )}
          <div className="flex gap-8">
            <p className="text-2xl font-normal text-black">
              Участники: {data?.participantsCount}
            </p>
            <button
              type="button"
              onClick={openRegisterRecipeModal}
              className="flex justify-start items-start py-1 px-2.5 border border-blue-200 rounded-xl cursor-pointer hover:bg-blue-50"
            >
              Зарегистрировать рецепт
            </button>
          </div>
          <div className="flex flex-wrap gap-5">
            {sortedRecipes.map((recipe) => (
              <ContestRecipeCard
                key={recipe.id}
                contestId={id!}
                recipe={recipe}
                bg={
                  Winner?.recipeId === recipe.id
                    ? "bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500 border-2 border-yellow-900 shadow-lg"
                    : "bg-gray-200"
                }
              />
            ))}
          </div>
        </>
      )}
      <ContestRecipeModal ref={registerRecipeRef} contestId={id!} />
    </section>
  );
}
