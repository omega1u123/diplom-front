import { useGetRecipeVotesQuery } from "@/API/contestAPI";
import { ComplexityEnum, Recipe } from "@/types/recipeTypes";
import { useNavigate } from "react-router-dom";

interface ContestRecipeCardProps {
  contestId: string;
  recipe: Recipe;
  bg?: string;
}
export const ContestRecipeCard = ({
  contestId,
  recipe,
  bg = "bg-gray-200",
}: ContestRecipeCardProps) => {
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/contests/${contestId}/recipe/${id}`, { replace: true });
  };
  const { data } = useGetRecipeVotesQuery(recipe.id);
  return (
    <div
      onClick={() => handleNavigate(recipe.id)}
      className={`flex justify-center items-center w-[358px] h-[287px] px-5 py-2.5 rounded-xl ${bg} cursor-pointer`}
    >
      <div className="flex flex-col gap-3.5">
        <div className="w-[325px] h-[162px]">
          <img src={recipe.fileUrl} alt="" className="w-full h-full" />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2.5">
            <div className="text-xl font-normal text-black">{recipe.name}</div>
            <div className="grid grid-cols-2">
              {recipe.dietaryRestrictionList.map((restriction) => (
                <p
                  key={restriction.id}
                  className="text-[11px] font-normal text-black"
                >
                  {restriction.name}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3.5 pr-4">
            <p className="text-[11px] font-normal text-black">
              {recipe.cuisine.name} кухня
            </p>
            <p className="text-[11px] font-normal text-black">
              {recipe.complexity === ComplexityEnum.Easy
                ? "Легкий"
                : recipe.complexity === ComplexityEnum.Hard
                ? "Сложный"
                : "Средний"}
            </p>
            <p className="text-[11px] font-normal text-black">
              Голосов: {data?.voteCount ? data.voteCount : "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
