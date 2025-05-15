import { useAddRecipeToContestMutation } from "@/API/contestAPI";
import { useGetPublicRecipesByUserIdQuery } from "@/API/recipeAPI";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RecipeCard } from "@/pages/main/Recipes/components/RecipeCard";
import { forwardRef } from "react";

interface ContestRecipeModalProps {
  contestId: string;
}

export const ContestRecipeModal = forwardRef<
  HTMLDialogElement,
  ContestRecipeModalProps
>(({ contestId }, ref) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { data, isLoading } = useGetPublicRecipesByUserIdQuery(userId, {
    skip: userId === null || userId === undefined || userId === "",
  });

  const [connect] = useAddRecipeToContestMutation();

  const handleAddRecipe = async (recipeId: string) => {
    try {
      await connect({ contestId, recipeId });
    } catch {
      return;
    }
  };
  return (
    <dialog
      ref={ref}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1400px]  rounded-lg shadow-lg bg-white  backdrop:bg-black/50"
      onClick={(e) => {
        if (
          ref &&
          "current" in ref &&
          ref.current &&
          e.target === ref.current
        ) {
          ref.current.close();
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
        className="cursor-pointer absolute top-0.5 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <div className="flex flex-col justify-start items-start gap-6 py-6 px-4">
        <h1 className="text-6xl font-semibold text-black">Мои рецепты</h1>
        {isLoading ? (
          <p>Загрузка</p>
        ) : (
          <div className="flex flex-wrap justify-start items-start gap-10 px-10">
            {data?.map((x) => (
              <div
                key={x.id}
                onClick={() => {
                  if (ref && "current" in ref && ref.current) {
                    ref.current.close();
                    handleAddRecipe(x.id);
                  }
                }}
                className="cursor-pointer"
              >
                <RecipeCard recipe={x} isClickable={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
});
