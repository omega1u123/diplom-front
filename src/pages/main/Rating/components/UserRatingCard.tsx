import { verifiedSign } from "@/assets";
import { UserRating } from "@/types/userTypes";

interface UserRatingCardProps {
  user: UserRating;
}

export const UserRatingCard = ({ user }: UserRatingCardProps) => {
  return (
    <div className="flex justify-center items-center w-[440px] h-[64px] p-3 rounded-xl border-[1px] border-gray-200">
      <div className="flex justify-center items-center gap-[23px]">
        <img src={user.imgUrl} alt="" className="w-10 h-10 rounded-xl" />
        <div className="flex justify-center items-center gap-3">
          <h2 className="h-[29px] text-2xl text-black font-normal">
            {user.userName}
          </h2>
          {user.isVerified && <img src={verifiedSign} alt="verified_sign" />}
        </div>
        <div className="flex flex-col justify-center items-start">
          <p className="text-xs text-gray-200 font-normal">
            Рейтинг: {user.averageRating}
          </p>
          <p className="text-xs text-gray-200 font-normal">
            Цел. кухня: {user.cuisingType}
          </p>
        </div>
      </div>
    </div>
  );
};
