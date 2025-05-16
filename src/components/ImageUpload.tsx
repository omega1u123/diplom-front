import { ChangeEvent } from "react";

interface ImageUploadProps {
  onImageSelect: (file: File | null, previewUrl: string | null) => void;
  preview: string | null;
  text?: string;
}

export const ImageUpload = ({
  onImageSelect,
  preview,
  text = "Нажмите или закиньте фотографию",
}: ImageUploadProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      onImageSelect(selectedFile, imageUrl);
    } else {
      onImageSelect(null, null);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full relative">
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full h-full cursor-pointer absolute z-30 opacity-0"
      />
      <label
        htmlFor="image-upload"
        className="w-full h-full flex justify-center items-center cursor-pointer hover:bg-gray-50 relative z-10 overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="Selected preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <p className="text-gray-500">{text}</p>
        )}
      </label>
    </div>
  );
};
