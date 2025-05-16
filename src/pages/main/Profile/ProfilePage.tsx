import { useFetchMediaMutation } from "@/API/mediaAPI";
import {
  useGetIsPaidSubQuery,
  useGetIsSubQuery,
  useGetPaidSubMutation,
  useGetServicesByUserIdQuery,
  useGetSubMutation,
  useGetUnSubMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/API/userAPI";
import { starIcon } from "@/assets";
import { ImageUpload } from "@/components/ImageUpload";
import { useAppSelector } from "@/hooks/reduxHooks";
import { CreateServiceModal } from "@/pages/main/Profile/components/CreateServiceModal";
import { ProfileTabs } from "@/pages/main/Profile/components/ProfileTabs";
import { ServiceCard } from "@/pages/main/Profile/components/ServiceCard";
import { ServiceModal } from "@/pages/main/Profile/components/ServiceModal";
import { PaidService, UserRole } from "@/types/userTypes";
import { uploadFileToMinio } from "@/utils/uploadToMinio";
import { useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

export default function ProfilePage() {
  const [service, setService] = useState<PaidService | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
  const { data: Services } = useGetServicesByUserIdQuery(id!);
  const [paidSub] = useGetPaidSubMutation();
  const [sub] = useGetSubMutation();
  const [unsub] = useGetUnSubMutation();
  const [fetchMedia] = useFetchMediaMutation();
  const [update] = useUpdateUserMutation();

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

  const handleImageSelect = async (
    file: File | null,
    previewUrl: string | null
  ) => {
    previewUrl = null;
    setPreviewUrl(previewUrl);
    if (data && file) {
      let fileUrl = "";
      try {
        fileUrl = await fetchMedia(file).unwrap();
        await uploadFileToMinio(file, fileUrl);
        console.log(fileUrl);
      } catch {
        return;
      }

      try {
        await update({ userId: data.id, name: data.name, fileUrl });
      } catch {
        return;
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
            <div className="relative">
              {id === userId && (
                <div className="absolute w-[236px] h-[199px]">
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    preview={previewUrl}
                    text=""
                  />
                </div>
              )}

              {data?.fileUrl === null ? (
                <div className="flex justify-center items-center w-[236px] h-[199px] bg-gray-100 rounded-xl text-9xl z-10">
                  <p>{data.name[0].toUpperCase()}</p>
                </div>
              ) : (
                <img
                  src={data?.fileUrl}
                  alt=""
                  className="w-[236px] h-[199px] rounded-xl z-10"
                />
              )}
            </div>

            <div className="flex">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3.5 items-center">
                  <p className="text-[40px] font-normal text-black">
                    {data?.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[40px] font-normal text-black">
                      Рейтинг: {data?.averageRating}
                    </p>
                    <img src={starIcon} alt="" className="size-5" />
                  </div>

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
