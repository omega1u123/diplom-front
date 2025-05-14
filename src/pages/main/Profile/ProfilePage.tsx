import {
  useGetIsSubQuery,
  useGetSubMutation,
  useGetUnSubMutation,
  useGetUserByIdQuery,
} from "@/API/userAPI";
import { useAppSelector } from "@/hooks/reduxHooks";
import { ProfileTabs } from "@/pages/main/Profile/components/ProfileTabs";
import { Outlet, useParams } from "react-router-dom";

export default function ProfilePage() {
  const userId = useAppSelector((state) => state.auth.userId);
  const { id } = useParams();
  const { data } = useGetUserByIdQuery(id!);
  const { data: isSub } = useGetIsSubQuery({
    subscriberId: userId,
    targetUserId: id!,
  });
  const [sub] = useGetSubMutation();
  const [unsub] = useGetUnSubMutation();

  const handleSub = async () => {
    if (id) {
      if (isSub?.isSubscribed) {
        try {
          await unsub({
            subscriberId: userId,
            targetUserId: id,
          });
        } catch {
          return;
        }
      } else {
        try {
          await sub({
            subscriberId: userId,
            targetUserId: id,
          });
        } catch {
          return;
        }
      }
    }
  };

  return (
    <section className="flex flex-col w-full justify-center items-center gap-[66px] py-16 px-36">
      <div className="flex w-full gap-8">
        <img
          src={data?.fileUrl}
          alt=""
          className="w-[236px] h-[199px] rounded-xl"
        />
        <div className="flex">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3.5 items-center">
              <p className="text-[40px] font-normal text-black">{data?.name}</p>
              <p className="text-[40px] font-normal text-black">
                Рейтинг: {data?.averageRating}
              </p>
              <p className="ml-24 text-xl font-normal text-black">
                {data?.subscriptionsCount} подписчиков
              </p>
            </div>
            <p className="text-2xl font-normal text-black">{data?.role}</p>
            {id === userId ? (
              <button className="flex justify-center items-center w-[161px] h-10 rounded-xl bg-gray-200 cursor-pointer hover:bg-gray-300 text-xl font-normal text-black">
                Услуги
              </button>
            ) : (
              <button
                onClick={handleSub}
                className="flex justify-center items-center w-[161px] h-10 rounded-xl bg-gray-200 cursor-pointer hover:bg-gray-300 text-xl font-normal text-black"
              >
                {isSub?.isSubscribed ? "Подписан" : "Подписаться"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-[25px]">
        <ProfileTabs userId={id!} />
        <div>
          <Outlet />
        </div>
      </div>
    </section>
  );
}
