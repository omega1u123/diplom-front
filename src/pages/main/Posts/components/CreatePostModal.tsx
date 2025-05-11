import { useFetchMediaMutation } from "@/API/mediaAPI";
import { useCreatePostMutation } from "@/API/postAPI";
import { ImageUpload } from "@/components/ImageUpload";
import { Textarea } from "@/components/Textarea";
import { useAppSelector } from "@/hooks/reduxHooks";
import { PostForm } from "@/types/postTypes";
import { uploadFileToMinio } from "@/utils/uploadToMinio";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";

export const CreatePostModal = forwardRef<HTMLDialogElement>((_, ref) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleImageSelect = (file: File | null, previewUrl: string | null) => {
    setImage(file);
    setPreviewUrl(previewUrl);
  };

  const userId = useAppSelector((state) => state.auth.userId);
  const [create] = useCreatePostMutation();
  const [fetchMedia] = useFetchMediaMutation();

  const { register, handleSubmit } = useForm<PostForm>();

  const handleSubmitCreate = async (data: PostForm) => {
    if (!image) return console.log("No image");
    let fileUrl = "";
    try {
      fileUrl = await fetchMedia(image).unwrap();
      // await uploadFileToMinio(image, fileUrl);
    } catch {
      return;
    }

    try {
      const Post = await create({
        text: data.text,
        userId,
        fileUrl,
      });
      console.log(Post);
    } catch {
      return;
    }

    if (ref && "current" in ref && ref.current) {
      ref.current.close();
    }
  };
  return (
    <dialog
      ref={ref}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] py-6 rounded-lg shadow-lg bg-white  backdrop:bg-black/50"
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
      <form
        id="post-form"
        onSubmit={handleSubmit(handleSubmitCreate)}
        method="dialog"
        className="flex flex-col items-center h-full gap-3"
      >
        <button
          type="button"
          onClick={() => {
            if (ref && "current" in ref && ref.current) {
              ref.current.close();
            }
          }}
          className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="flex justify-center items-center w-[566px] h-[400px] bg-gray-300">
          <ImageUpload onImageSelect={handleImageSelect} preview={previewUrl} />
        </div>
        <Textarea<PostForm>
          name="text"
          register={register}
          width="566"
          height="158"
          placeholder="Введите текст"
        />
        <button
          form="post-form"
          type="submit"
          className="w-[556px] h-10 rounded-xl bg-blue-400 cursor-pointer text-2xl font-medium text-white hover:bg-blue-500"
        >
          Создать
        </button>
      </form>
    </dialog>
  );
});
