import { Comment } from "@/types/commentTypes";
import { useNavigate } from "react-router-dom";

interface CommentCardProps {
  comment: Comment;
}
export const CommentCard = ({ comment }: CommentCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-start items-center w-[516px] min-h-[97px] p-3 gap-2.5 rounded-xl border-[1px] border-gray-200">
      {comment.fileUrl === null ? (
        <div
          onClick={() => {
            navigate(`/profile/${comment.userId}`);
          }}
          className="flex justify-center items-center w-[73px] h-[73px] bg-gray-100 rounded-xl text-xl cursor-pointer"
        >
          <p>{comment.name[0].toUpperCase()}</p>
        </div>
      ) : (
        <img
          onClick={() => {
            navigate(`/profile/${comment.userId}`);
          }}
          src={comment.fileUrl}
          alt=""
          className="w-[73px] h-[73px] rounded-xl cursor-pointer"
        />
      )}
      <div className="flex flex-col items-start gap-1 justify-center">
        <h3 className="text-base font-normal text-black">{comment.name}</h3>
        <p className="text-[13px] font-normal text-black">{comment.text}</p>
      </div>
    </div>
  );
};
