import { Contest } from "@/types/contestTypes";
import { useNavigate } from "react-router-dom";

interface ContestCardProps {
  contest: Contest;
}

export const ContestCard = ({ contest }: ContestCardProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/contests/${contest.id}`, { replace: true });
  };
  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col items-start justify-center px-2.5 py-1.5 bg-gray-200 cursor-pointer rounded-xl hover:bg-gray-300"
    >
      <h2 className="text-xl font-semibold text-black">{contest.title}</h2>
      <p className="text-base font-normal text-black">{contest.description}</p>
      <div>
        <p className="text-sm font-normal text-black">
          Дата начала: {contest.startDate}
        </p>
        <p className="text-sm font-normal text-black">
          Дата окончания: {contest.endDate}
        </p>
      </div>
    </div>
  );
};
