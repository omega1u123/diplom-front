import {
  useGetPostCommentsQuery,
  usePostCommentMutation,
} from "@/API/commentAPI";
import { CommentCard } from "@/components/CommentCard";
import { Textarea } from "@/components/Textarea";
import { CommentForm } from "@/types/commentTypes";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface PostCommentsModalProps {
  postId: string;
  userId: string;
}

export const PostCommentsModal = forwardRef<
  HTMLDialogElement,
  PostCommentsModalProps
>(({ postId, userId }, ref) => {
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    setIsCreate(false);
  }, [postId]);

  const { data } = useGetPostCommentsQuery({ postId }, { skip: !postId });

  const { register, handleSubmit, reset } = useForm<CommentForm>();

  const [create] = usePostCommentMutation();
  const handleCreate = async (data: CommentForm) => {
    try {
      await create({ postId, recipeId: null, text: data.text, userId });
      reset();
      setIsCreate(false);
    } catch {
      return;
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
      <div className="flex flex-col items-center h-full gap-3">
        <button
          type="button"
          onClick={() => {
            if (ref && "current" in ref && ref.current) {
              ref.current.close();
            }
          }}
          className="text-2xl cursor-pointer absolute -top-1 right-1 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <form
          id="post-comment"
          onSubmit={handleSubmit(handleCreate)}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-6">
            <h1 className="text-[32px] font-normal text-black">Комментарии</h1>
            {isCreate ? (
              <div className="flex gap-2.5">
                <button
                  type="submit"
                  form="post-comment"
                  className="flex justify-center items-center w-[100px] h-[35px] bg-blue-200 rounded-xl cursor-pointer hover:bg-blue-300 text-base font-normal text-black"
                >
                  Оставить
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreate(false)}
                  className="flex justify-center items-center w-[100px] h-[35px] bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 text-base font-normal text-black"
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsCreate(true);
                }}
                className="flex justify-center items-center w-[210px] h-[35px] bg-blue-200 rounded-xl cursor-pointer hover:bg-blue-300 text-base font-normal text-black"
              >
                Оставить комментарий
              </button>
            )}
          </div>

          {isCreate && (
            <Textarea<CommentForm>
              name="text"
              register={register}
              width="435"
              placeholder="Напишите свой комментарий"
            />
          )}
        </form>
        {data?.map((x) => (
          <CommentCard key={x.id} comment={x} />
        ))}
      </div>
    </dialog>
  );
});
