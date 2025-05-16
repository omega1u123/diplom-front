import { useCreateRecipeStepMutation } from "@/API/recipeStepAPI";
import { plusSign } from "@/assets";
import { RecipeStep } from "@/types/recipeTypes";
import { useState } from "react";

interface RecipeStepListProps {
  recipeSteps: RecipeStep[] | null;
  setRecipeSteps: React.Dispatch<React.SetStateAction<RecipeStep[] | null>>;
}

export const RecipeStepList = ({
  recipeSteps,
  setRecipeSteps,
}: RecipeStepListProps) => {
  const [formMenu, setFormMenu] = useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [create] = useCreateRecipeStepMutation();

  const handleCreate = async () => {
    const newRecipeStep = await create({
      stepNumber: stepNumber + 1,
      description,
      imageUrl: null,
    }).unwrap();
    setFormMenu(false);
    setStepNumber((prev) => prev + 1);
    setDescription("");
    setRecipeSteps((prev) => [...(prev || []), newRecipeStep]);
  };

  const handleExit = () => {
    setFormMenu(false);
    setDescription("");
  };

  return (
    <div className="flex flex-col gap-1">
      <p>Шаги:</p>
      {recipeSteps?.map((step, index) => (
        <div key={step.id} className="flex justify-start items-center gap-1">
          <p>{`${index + 1}. `}</p>
          <p>{step.description}</p>
        </div>
      ))}
      {formMenu && (
        <div className="flex justify-start items-center gap-0.5">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Название"
            className="text-sm w-28 h-6 px-1 border-[1px] border-[#D9D9D9] rounded-[8px] placeholder:text-sm"
          />
          <button
            type="button"
            onClick={handleCreate}
            className="text-sm px-1 py-0.5 bg-blue-400 rounded-[8px] cursor-pointer hover:bg-blue-500"
          >
            Создать
          </button>
          <button
            type="button"
            onClick={handleExit}
            className="text-sm px-1 py-0.5 bg-blue-200 rounded-[8px] cursor-pointer hover:bg-blue-300"
          >
            Отмена
          </button>
        </div>
      )}
      {!formMenu && (
        <button
          type="button"
          onClick={() => {
            setFormMenu(true);
          }}
          className="cursor-pointer"
        >
          <img src={plusSign} alt="plus_sign" />
        </button>
      )}
    </div>
  );
};
