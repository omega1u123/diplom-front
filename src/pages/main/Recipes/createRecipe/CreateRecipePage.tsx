import { ImageUpload } from "@/components/ImageUpload";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";
import { Recipe } from "@/types/recipeTypes";
import { useState } from "react";

const options = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];

export default function CreateRecipePage() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelect = (file: File | null, previewUrl: string | null) => {
    setImage(file);
    setPreviewUrl(previewUrl);
  };

  return (
    <section className="flex flex-col justify-center items-center h-full w-full gap-[34px] py-10">
      <form
        action=""
        className="flex flex-col justify-center items-center h-full w-full gap-[34px]"
      >
        <div className="flex justify-center gap-[34px]">
          <div className="flex justify-center items-center w-[767px] h-[628px] bg-gray-300">
            <ImageUpload
              onImageSelect={handleImageSelect}
              preview={previewUrl}
            />
          </div>
          <div className="flex flex-col justify-start items-start py-8 px-14 w-[470px] h-[628px] gap-6 rounded-[12px] bg-gray-200">
            <Input<Recipe> label={"Название"} />
            <Input<Recipe> label={"Сложность"} />
            <SelectInput<Recipe> label={"Тип кухни"} options={options} />
            <Input<Recipe> label={"Время приготовления, мин"} />
            <div className="flex gap-10">
              <div className="flex flex-col gap-3">
                <Input<Recipe>
                  label={"Белки, гр"}
                  textSize="15"
                  width="136"
                  height="27"
                />
                <Input<Recipe>
                  label={"Жиры, гр"}
                  textSize="15"
                  width="136"
                  height="27"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Input<Recipe>
                  label={"Углеводы, гр"}
                  textSize="15"
                  width="136"
                  height="27"
                />
                <Input<Recipe>
                  label={"Калории, ккал"}
                  textSize="15"
                  width="136"
                  height="27"
                />
              </div>
            </div>
            <button className="flex justify-center items-center w-36 h-9 rounded-xl bg-[#C9DCFF] text-xl font-normal text-black cursor-pointer hover:bg-[#B0CFFF]">
              Сохранить
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[1272px] h-[467px] rounded-[12px] bg-gray-200"></div>
      </form>
    </section>
  );
}
