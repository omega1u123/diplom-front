import { Achievement } from "@/types/userTypes";

interface AchievementCardProps {
  achievement: Achievement;
}
export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <div className="flex flex-col items-start justify-center gap-3 w-[343px] h-[139px] px-2.5 py-3.5 rounded-xl bg-gray-200">
      <h2 className="text-xl font-semibold text-black">{achievement.name}</h2>
      <p className="text-base font-normal text-black">
        {achievement.description}
      </p>
      <p className="text-sm font-normal text-black">{achievement.dateEarned}</p>
    </div>
  );
};
