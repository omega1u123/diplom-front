import { ImageUpload } from "@/components/ImageUpload";
import { useState } from "react";

export default function CreateRecipePage() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelect = (file: File | null, previewUrl: string | null) => {
    setImage(file);
    setPreviewUrl(previewUrl);
  };

  return (
    <section className="flex flex-col justify-center items-center h-full w-full gap-[34px] py-10">
      <div className="flex justify-center gap-[34px]">
        <div className="flex justify-center items-center w-[767px] h-[628px] bg-gray-300">
          <ImageUpload onImageSelect={handleImageSelect} preview={previewUrl} />
        </div>
        <div className="flex flex-col justify-center items-center w-[470px] h-[628px] rounded-[12px] bg-gray-200"></div>
      </div>
      <div className="flex flex-col justify-center items-center w-[1272px] h-[467px] rounded-[12px] bg-gray-200"></div>
    </section>
  );
}
