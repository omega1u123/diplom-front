import {
  useGetRecipeCommentsQuery,
  usePostCommentMutation,
} from "@/API/commentAPI";
import {
  useDeleteRecipeMutation,
  useGetRecipeByIdQuery,
  useRateRecipeMutation,
  useSaveRecipeMutation,
} from "@/API/recipeAPI";
import { CommentCard } from "@/components/CommentCard";
import { InteractiveRatingStars } from "@/components/InteractiveRatingStars";
import { RatingStars } from "@/components/RatingStars";
import { Textarea } from "@/components/Textarea";
import { useAppSelector } from "@/hooks/reduxHooks";
import { CommentForm } from "@/types/commentTypes";
import { ComplexityEnum } from "@/types/recipeTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipePage() {
  const userId = useAppSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const { id } = useParams();
  const { data } = useGetRecipeByIdQuery(id!);

  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const [create] = usePostCommentMutation();
  const [rate] = useRateRecipeMutation();
  const [remove] = useDeleteRecipeMutation();
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

  const handleRate = async (value: number) => {
    if (id && userId) {
      try {
        await rate({ recipeId: id, userId, value });
      } catch {
        return;
      }
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await remove(id);
      } catch {
        return;
      }
      navigate("/recipes");
    }
  };
  return (
    <section className="flex flex-col justify-center items-center h-full w-full gap-[34px] py-10">
      <div className="flex flex-col justify-center items-center h-full w-full gap-[34px]">
        <div className="flex justify-center gap-[34px]">
          <div className="flex justify-center items-center w-[767px] bg-gray-300">
            <img src={data?.fileUrl} alt="" className="object-cover h-full" />
          </div>
          <div className="flex flex-col justify-between items-start py-8 px-14 w-[470px] min-h-[500px] gap-6 rounded-[12px] bg-gray-200">
            <div className="flex gap-10">
              <div className="flex flex-col gap-5 text-xl font-normal text-black">
                <p>Название: {data?.name}</p>
                <p>
                  Автор:{" "}
                  <span
                    onClick={() => {
                      navigate(`/profile/${data?.user.id}`);
                    }}
                    className="cursor-pointer"
                  >
                    {data?.user.name}
                  </span>
                </p>
                <p>
                  Сложность:{" "}
                  {data?.complexity === ComplexityEnum.Easy
                    ? "Легкий"
                    : data?.complexity === ComplexityEnum.Hard
                    ? "Сложный"
                    : "Средний"}
                </p>
                <div className="flex items-center gap-4 py-1.5">
                  <p className="pb-0.5">Рейтинг:</p>
                  {data && <RatingStars rating={data?.averageRating} />}
                </div>

                <div className="flex flex-wrap gap-2">
                  <p>Диетические ограничения: </p>
                  {data?.dietaryRestrictionList.map((x) => (
                    <p key={x.id}>{x.name}</p>
                  ))}
                </div>

                <p>Тип кухни: {data?.cuisine.name} кухня</p>
                <p>Время приготовления: {data?.cookingTime} мин</p>
                <div className="flex flex-wrap gap-5">
                  <p>Белки: {data?.proteins} гр</p>
                  <p>Жиры: {data?.fats} гр</p>
                  <p>Углеводы: {data?.carb} гр</p>
                  <p>Калории: {data?.calories} ккал</p>
                </div>
              </div>
            </div>
            {userId === data?.user.id ? (
              <div className="flex justify-between items-center w-full">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex justify-center items-center w-36 h-9 rounded-xl bg-red-500 text-xl font-normal text-white cursor-pointer hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex justify-center items-center w-36 h-9 rounded-xl bg-[#C9DCFF] text-xl font-normal text-black cursor-pointer hover:bg-[#B0CFFF]"
                >
                  Сохранить
                </button>
                <InteractiveRatingStars setValue={handleRate} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-[1272px] py-3 px-4 rounded-[12px] bg-gray-200">
          <div>
            <h2 className="text-2xl font-normal text-black">Описание:</h2>
            <p className="max-w-[1236px] text-xl font-normal text-black text-wrap break-words">
              {data?.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-normal text-black">Ингредиенты:</h2>
            {data?.ingredientList.map((x, index) => (
              <p key={x.id} className="text-xl font-normal text-black">
                {index + 1}. {x.name}, {x.quantity}, {x.unit}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-normal text-black">Шаги:</h2>
            {data?.recipeStepList &&
              [...data.recipeStepList]
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
