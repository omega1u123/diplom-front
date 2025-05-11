import { Comment } from "@/types/commentTypes";

interface CommentCardProps {
  comment: Comment;
}
export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="flex justify-start items-center w-[516px] min-h-[97px] p-3 gap-2.5 rounded-xl border-[1px] border-gray-200">
      <img src={comment.fileUrl} alt="" className="size-[73px] rounded-xl" />
      <div className="flex flex-col items-start gap-1 justify-center">
        <h3 className="text-base font-normal text-black">{comment.name}</h3>
        <p className="text-[13px] font-normal text-black">{comment.text}</p>
      </div>
    </div>
  );
};
