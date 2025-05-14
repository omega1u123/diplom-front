import { useGetUserByIdQuery } from "@/API/userAPI";
import { AchievementCard } from "@/pages/main/Profile/components/AchievementCard";
import { useParams } from "react-router-dom";

export default function ProfileAchievementsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id!);
  return (
    <div className="flex flex-wrap justify-start items-center gap-14">
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        data?.achievements?.map((x) => (
          <AchievementCard key={x.id} achievement={x} />
        ))
      )}
      {data?.achievements === null || data?.achievements?.length === 0 ? (
        <div>
          <p>Нет достижений</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
