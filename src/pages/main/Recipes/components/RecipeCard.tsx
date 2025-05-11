import { Recipe } from "@/types/recipeTypes";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`${id}`);
  };
  return (
    <div
      onClick={() => handleNavigate(recipe.id)}
      className="flex justify-center items-center w-[358px] h-[287px] px-5 py-2.5 rounded-xl bg-gray-200 cursor-pointer"
    >
      <div className="flex flex-col gap-3.5">
        <div className="w-[325px] h-[162px]">
          <img src={recipe.fileUrl} alt="" className="w-full h-full" />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
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
          <div className="flex flex-col gap-3.5">
            <p className="text-[11px] font-normal text-black">
              {recipe.cuisine.name}
            </p>
            <p className="text-[11px] font-normal text-black">
              {recipe.complexity}
            </p>
            <p className="text-[11px] font-normal text-black">
              Рейтинг: {recipe.averageRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
