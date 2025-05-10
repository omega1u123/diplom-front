import { useGetDietaryRestrictionsQuery } from "@/API/dietaryRestrictionAPI";
import { plusSign } from "@/assets";
import { DietaryRestriction } from "@/types/recipeTypes";
import { useState } from "react";

interface DietaryRestrictionListProps {
  dietaryRestriction: DietaryRestriction[] | null;
  setDietaryRestriction: React.Dispatch<
    React.SetStateAction<DietaryRestriction[] | null>
  >;
}

export const DietaryRestrictionList = ({
  dietaryRestriction,
  setDietaryRestriction,
}: DietaryRestrictionListProps) => {
  const [selectMenu, setSelectMenu] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const { data: restrictions } = useGetDietaryRestrictionsQuery();

  const handleSelect = () => {
    console.log(selectedId, restrictions);
    if (!selectedId || !restrictions) return;
    const selected = restrictions.find((r) => r.id === selectedId);
    console.log(selected);
    if (!selected) return;
    setDietaryRestriction((prev) => [...(prev || []), selected]);
    setSelectedId("");
    setSelectMenu(false);
  };
  return (
    <>
      <div className="flex items-center flex-wrap gap-2">
        <span className="">Диетические ограничения: </span>
        {dietaryRestriction?.map((restriction) => (
          <div
            key={restriction.id}
            className="flex justify-center items-center w-24 rounded-xl bg-gray-300"
          >
            <p className="text-base font-normal text-black">
              {restriction.name}
            </p>
          </div>
        ))}
        {selectMenu && restrictions ? (
          <>
            <div className="flex gap-1.5">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                <option key="none" value="">
                  Выберите опцию
                </option>
                {restrictions
                  .filter(
                    (restriction) =>
                      !dietaryRestriction?.some(
                        (dr) => dr.id === restriction.id
                      )
                  )
                  .map((restrictions) => (
                    <option key={restrictions.id} value={restrictions.id}>
                      {restrictions.name}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleSelect}
                className="text-sm px-1 py-0.5 bg-blue-400 rounded-[8px] cursor-pointer hover:bg-blue-500"
              >
                Выбрать
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectMenu(false);
                }}
                className="text-sm px-1 py-0.5 bg-blue-200 rounded-[8px] cursor-pointer hover:bg-blue-300"
              >
                Отмена
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {!selectMenu && (
          <img
            className="cursor-pointer"
            onClick={() => {
              setSelectMenu(true);
            }}
            style={{
              width: "15px",
              height: "15px",
            }}
            src={plusSign}
            alt="plus_sign"
          />
        )}
      </div>
    </>
  );
};
