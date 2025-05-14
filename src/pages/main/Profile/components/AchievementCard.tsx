import { Achievement } from "@/types/userTypes";

interface AchievementCardProps {
  achievement: Achievement;
}
export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <div className="flex flex-col items-start justify-center gap-3 min-w-[343px] min-h-[139px] rounded-xl bg-gray-200">
      <h2 className="text-2xl font-semibold text-black">{achievement.name}</h2>
      <p className="text-xl font-normal text-black">
        {achievement.description}
      </p>
      <p className="text-sm font-normal text-black">{achievement.dateEarned}</p>
    </div>
  );
};
