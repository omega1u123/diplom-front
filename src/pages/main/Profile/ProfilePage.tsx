import {
  useGetIsPaidSubQuery,
  useGetIsSubQuery,
  useGetPaidSubMutation,
  useGetServicesByUserIdQuery,
  useGetSubMutation,
  useGetUnSubMutation,
  useGetUserByIdQuery,
} from "@/API/userAPI";
import { useAppSelector } from "@/hooks/reduxHooks";
import { CreateServiceModal } from "@/pages/main/Profile/components/CreateServiceModal";
import { ProfileTabs } from "@/pages/main/Profile/components/ProfileTabs";
import { ServiceCard } from "@/pages/main/Profile/components/ServiceCard";
import { ServiceModal } from "@/pages/main/Profile/components/ServiceModal";
import { PaidService, UserRole } from "@/types/userTypes";
import { useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

export default function ProfilePage() {
  const [service, setService] = useState<PaidService | null>(null);
  const userId = useAppSelector((state) => state.auth.userId);
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id!);
  const { data: isSub } = useGetIsSubQuery(
    {
      subscriberId: userId,
      targetUserId: id!,
    },
    { skip: userId === id || userId === "" }
  );
  const { data: isPaidSub } = useGetIsPaidSubQuery(
    {
      subscriberId: userId,
      targetUserId: id!,
    },
    { skip: userId === id || userId === "" }
  );
  console.log(isPaidSub + "paid");
  const { data: Services } = useGetServicesByUserIdQuery(id!);
  const [paidSub] = useGetPaidSubMutation();
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

  const handlePaidSub = async () => {
    if (id) {
      if (!isPaidSub?.isSubscribed) {
        try {
          await paidSub({
            subscriberId: userId,
            targetUserId: id,
          });
        } catch {
          return;
        }
      }
    }
  };

  const createServiceRef = useRef<HTMLDialogElement>(null);
  const openCreateServiceModal = () => {
    if (createServiceRef.current && !createServiceRef.current.open) {
      createServiceRef.current.showModal();
    }
  };

  const showServiceRef = useRef<HTMLDialogElement>(null);
  const openShowServiceModal = () => {
    if (showServiceRef.current && !showServiceRef.current.open) {
      showServiceRef.current.showModal();
    }
  };

  return (
    <section className="flex flex-col w-full justify-center items-center gap-[66px] py-16 px-36">
      {isLoading ? (
        "Загрузка"
      ) : (
        <>
          <div className="flex w-full gap-8">
            <img
              src={data?.fileUrl}
              alt=""
              className="w-[236px] h-[199px] rounded-xl"
            />
            <div className="flex">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3.5 items-center">
                  <p className="text-[40px] font-normal text-black">
                    {data?.name}
                  </p>
                  <p className="text-[40px] font-normal text-black">
                    Рейтинг: {data?.averageRating}
                  </p>
                  <p className="ml-24 text-xl font-normal text-black">
                    {data?.subscriptionsCount} подписчиков
                  </p>
                </div>
                <p className="text-2xl font-normal text-black">{data?.role}</p>
                {id === userId ? (
                  <button
                    onClick={openCreateServiceModal}
                    className={`flex justify-center items-center w-[161px] h-10 rounded-xl bg-gray-200 cursor-pointer hover:bg-gray-300 text-xl font-normal text-black ${
                      data?.role === UserRole.Cook ? "" : "hidden"
                    }`}
                  >
                    {data?.role === UserRole.User ? "" : "Услуги"}
                  </button>
                ) : (
                  <div className="flex gap-2.5">
                    <button
                      onClick={handleSub}
                      className="flex justify-center items-center px-2.5 h-10 rounded-xl bg-gray-200 cursor-pointer hover:bg-gray-300 text-xl font-normal text-black"
                    >
                      {isSub?.isSubscribed
                        ? "Перестать отслеживать"
                        : "Отслеживать"}
                    </button>
                    <button
                      onClick={handlePaidSub}
                      className="flex justify-center items-center px-2.5 h-10 rounded-xl bg-gray-200 cursor-pointer hover:bg-gray-300 text-xl font-normal text-black"
                    >
                      {isPaidSub?.isSubscribed
                        ? "Платно подписан"
                        : "Платно подписаться"}
                    </button>
                  </div>
                )}
                <div>
                  {Services?.map((x) => (
                    <ServiceCard
                      key={x.id}
                      isDisabled={id === userId}
                      openModal={openShowServiceModal}
                      service={x}
                      setService={setService}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-[25px]">
            <ProfileTabs
              userId={id!}
              currentUserId={userId}
              isPaidSub={isPaidSub?.isSubscribed}
            />
            <div>
              <Outlet />
            </div>
          </div>
          <CreateServiceModal ref={createServiceRef} userId={id!} />
          <ServiceModal
            ref={showServiceRef}
            userId={userId}
            service={service}
            setService={setService}
          />
        </>
      )}
    </section>
  );
}
