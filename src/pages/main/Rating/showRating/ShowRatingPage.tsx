import { useGetRatingUsersQuery } from "@/API/userAPI";
import { UserRatingCard } from "@/pages/main/Rating/components/UserRatingCard";

export default function ShowRatingPage() {
  const { data, isLoading, isError } = useGetRatingUsersQuery({
    page: 1,
    pageSize: 9999,
  });

  const UserRatings = data?.users;

  if (isLoading) return <p>Загрузка рейтинга...</p>;
  if (isError) return <p>Ошибка при загрузке рейтинга</p>;
  return (
    <section className="flex flex-col items-center gap-3.5">
      <h1 className="text-[42px] font-bold text-black">Рейтинг</h1>
      {UserRatings &&
        UserRatings.map((user, index) => (
          <div
            key={user.userId}
            className="flex justify-between items-center gap-8"
          >
            <div className="text-2xl font-normal text-black">{index + 1}.</div>
            <UserRatingCard user={user} />
          </div>
        ))}
    </section>
  );
}
