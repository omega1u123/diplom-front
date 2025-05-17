import { Dispatch, SetStateAction, useState } from "react";

interface FilterItem {
  id: string;
  name: string;
}

interface RecipeFilterCardProps<T extends FilterItem> {
  name: string;
  data: T[] | undefined | null;
  state: T | null;
  setState: Dispatch<SetStateAction<T | null>>;
}
export const RecipeFilterCard = <T extends FilterItem>({
  name,
  data,
  state,
  setState,
}: RecipeFilterCardProps<T>) => {
  const [isCovered, setIsCovered] = useState<boolean>(false);
  const toggleCover = () => {
    setIsCovered((prev) => !prev);
  };
  return (
    <div className="flex flex-col justify-start items-center w-full px-1.5 py-2 border-[1px] border-gray-200 rounded-xl">
      <h2
        onClick={toggleCover}
        className={`text-[17px] font-normal text-black ${
          isCovered && "mb-2"
        } cursor-pointer`}
      >
        {name}
      </h2>
      {isCovered && (
        <div className="flex flex-col justify-start items-center gap-2">
          {data?.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (state === item) {
                  setState(null);
                } else {
                  setState(item);
                }
              }}
              className={`flex justify-start items-center w-[222px] h-[28px] px-1.5 rounded-xl text-[12px] font-normal text-black cursor-pointer ${
                state === item
                  ? "bg-blue-200"
                  : "border-[1px] border-gray-200 hover:bg-gray-100"
              } `}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
