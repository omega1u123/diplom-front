import { useCreateIngredientMutation } from "@/API/ingredientAPI";
import { plusSign } from "@/assets";
import { Ingredient } from "@/types/recipeTypes";
import { useState } from "react";

interface IngredientListProps {
  ingredients: Ingredient[] | null;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[] | null>>;
}

export const IngredientList = ({
  ingredients,
  setIngredients,
}: IngredientListProps) => {
  const [formMenu, setFormMenu] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [create] = useCreateIngredientMutation();

  const handleCreate = async () => {
    const newIngredient = await create({ name, quantity, unit }).unwrap();
    setFormMenu(false);
    setIngredients((prev) => [...(prev || []), newIngredient]);
    setName("");
    setQuantity(0);
    setUnit("");
  };

  const handleExit = () => {
    setFormMenu(false);
    setName("");
    setQuantity(0);
    setUnit("");
  };

  return (
    <div className="flex flex-col gap-1">
      <p>Ингредиенты:</p>
      {ingredients
        ? ingredients.map((ingredient, index) => (
            <div key={index} className="flex justify-start items-center gap-1">
              <p>{`${index + 1}. `}</p>
              <p>{`${ingredient.name}, ${ingredient.quantity} ${ingredient.unit}`}</p>
            </div>
          ))
        : ""}
      {formMenu && (
        <div className="flex justify-start items-center gap-0.5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Название"
            className="text-sm w-28 h-6 px-1 border-[1px] border-[#D9D9D9] rounded-[8px] placeholder:text-sm"
          />
          <input
            value={quantity === null ? "" : quantity}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              setQuantity(Number(numericValue));
            }}
            type="number"
            placeholder="Количество"
            className="text-sm w-28 h-6 px-1 border-[1px] border-[#D9D9D9] rounded-[8px] placeholder:text-sm"
          />
          <input
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            type="text"
            placeholder="Ед. измерения"
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
