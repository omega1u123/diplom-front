import { verifiedSign } from "@/assets";
import { UserRating } from "@/types/userTypes";
import { useNavigate } from "react-router-dom";

interface UserRatingCardProps {
  user: UserRating;
}

export const UserRatingCard = ({ user }: UserRatingCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-[440px] h-[64px] p-3 rounded-xl border-[1px] border-gray-200">
      <div className="flex justify-center items-center gap-[23px]">
        {user.fileUrl === null ? (
          <div
            onClick={() => {
              navigate(`/profile/${user.userId}`);
            }}
            className="flex justify-center items-center w-10 h-10 bg-gray-100 rounded-xl text-xl cursor-pointer"
          >
            <p>{user.userName[0].toUpperCase()}</p>
          </div>
        ) : (
          <img
            onClick={() => {
              navigate(`/profile/${user.userId}`);
            }}
            src={user.fileUrl}
            alt=""
            className="w-10 h-10 rounded-xl cursor-pointer"
          />
        )}
        <div className="flex justify-center items-center gap-3">
          <h2 className="h-[29px] text-2xl text-black font-normal">
            {user.userName}
          </h2>
          {user.isCook && <img src={verifiedSign} alt="verified_sign" />}
        </div>
      </div>
      <div className="flex flex-col justify-center items-start w-[150px]">
        <p className="text-xs text-black font-normal">
          Рейтинг: {user.averageRating}
        </p>
        <p className="text-xs text-black font-normal">
          Цел. кухня: {user.cuisine.name}
        </p>
      </div>
    </div>
  );
};
