import { PaidService } from "@/types/userTypes";
import { Dispatch, SetStateAction } from "react";

interface ServiceCardProps {
  openModal: () => void;
  service: PaidService;
  isDisabled: boolean;
  setService: Dispatch<SetStateAction<PaidService | null>>;
}
export const ServiceCard = ({
  service,
  isDisabled,
  openModal,
  setService,
}: ServiceCardProps) => {
  const handleOpen = () => {
    setService(service);
    openModal();
  };
  return (
    <button
      onClick={handleOpen}
      disabled={isDisabled}
      className={`flex justify-center items-center h-10 px-2.5 rounded-xl bg-blue-200  text-xl font-normal text-black ${
        isDisabled ? "" : "cursor-pointer hover:bg-blue-300"
      }`}
    >
      {service.title}
    </button>
  );
};
