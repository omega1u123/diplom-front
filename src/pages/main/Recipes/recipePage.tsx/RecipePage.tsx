import {
  useGetRecipeCommentsQuery,
  usePostCommentMutation,
} from "@/API/commentAPI";
import { useGetRecipeByIdQuery, useSaveRecipeMutation } from "@/API/recipeAPI";
import { CommentCard } from "@/components/CommentCard";
import { Textarea } from "@/components/Textarea";
import { useAppSelector } from "@/hooks/reduxHooks";
import { CommentForm } from "@/types/commentTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function RecipePage() {
  const userId = useAppSelector((state) => state.auth.userId);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const { id } = useParams();
  const { data } = useGetRecipeByIdQuery(id!);

  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [create] = usePostCommentMutation();
  const { data: comments } = useGetRecipeCommentsQuery(
    { recipeId: id! },
    { skip: !id }
  );
  const handleCreate = async (data: CommentForm) => {
    try {
      await create({ postId: null, recipeId: id!, text: data.text, userId });
      reset();
      setIsCreate(false);
    } catch {
      return;
    }
  };

  const [save] = useSaveRecipeMutation();
  const handleSave = async () => {
    if (data) {
      try {
        await save({ recipeId: data?.id, userId });
      } catch {
        return;
      }
    }
  };
  return (
    <section className="flex flex-col justify-center items-center h-full w-full gap-[34px] py-10">
      <div className="flex flex-col justify-center items-center h-full w-full gap-[34px]">
        <div className="flex justify-center gap-[34px]">
          <div className="flex justify-center items-center w-[767px] h-[628px] bg-gray-300">
            <img
              src={data?.fileUrl}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-between items-start py-8 px-14 w-[470px] min-h-[628px] gap-6 rounded-[12px] bg-gray-200">
            <div className="flex gap-10">
              <div className="flex flex-col gap-3 text-xl font-normal text-black">
                <p>Название: {data?.name}</p>
                <p>Автор: {data?.user.name}</p>
                <p>Сложность: {data?.complexity}</p>
                <p>Рейтинг: {data?.averageRating}</p>
                <div className="flex flex-wrap gap-2">
                  <p>Диетические ограничения: </p>
                  {data?.dietaryRestrictionList.map((x) => (
                    <p key={x.id}>{x.name}</p>
                  ))}
                </div>

                <p>Тип кухни: {data?.cuisine.name}</p>
                <p>Время приготовления: {data?.cookingTime} мин</p>
                <div className="flex flex-wrap gap-3">
                  <p>Белки: {data?.proteins} гр</p>
                  <p>Жиры: {data?.fats} гр</p>
                  <p>Углеводы: {data?.carb} гр</p>
                  <p>Калории: {data?.calories} ккал</p>
                </div>
              </div>
            </div>
            {userId === data?.user.id ? (
              <button
                type="button"
                onClick={handleSave}
                className="flex justify-center items-center w-36 h-9 rounded-xl bg-[#C9DCFF] text-xl font-normal text-black cursor-pointer hover:bg-[#B0CFFF]"
              >
                Сохранить
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-[1272px]  py-3 px-4 rounded-[12px] bg-gray-200">
          <p className="w-[1236px] h-[150px] text-xl font-normal text-black">
            {data?.description}
          </p>
          <div>
            <h2 className="text-2xl font-normal text-black">Ингредиенты:</h2>
            {data?.ingredientList.map((x, index) => (
              <p key={x.id} className="text-xl font-normal text-black">
                {index + 1}. {x.name}, {x.quantity}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-normal text-black">Шаги:</h2>
            {data?.recipeStepList
              .sort((a, b) => a.stepNumber - b.stepNumber)
              .map((x) => (
                <p key={x.id} className="text-xl font-normal text-black">
                  {x.stepNumber}. {x.description}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-[1272px]  py-3 px-4 rounded-[12px] bg-gray-200">
          <form
            id="post-comment"
            onSubmit={handleSubmit(handleCreate)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-6">
              <h1 className="text-[32px] font-normal text-black">
                Комментарии
              </h1>
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
                    className="flex justify-center items-center w-[100px] h-[35px] bg-gray-300 rounded-xl cursor-pointer hover:bg-gray-400 text-base font-normal text-black"
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
          {comments?.map((x) => (
            <CommentCard key={x.id} comment={x} />
          ))}
        </div>
      </div>
    </section>
  );
}
