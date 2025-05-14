import { commentSign, likeSign } from "@/assets";
import { Post } from "@/types/postTypes";

interface PostProfileCardProps {
  post: Post;
}

export const PostProfileCard = ({ post }: PostProfileCardProps) => {
  return (
    <div className="flex flex-col justify-start items-center w-[683px] min-h-[582px] px-3 py-4 gap-8 bg-gray-200 rounded-xl ">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2.5">
          <img
            src={post.userFileUrl}
            alt=""
            className="w-[35px] h-[35px] rounded-xl"
          />
          <p className="text-xl font-normal text-black">{post.username}</p>
        </div>
        <p className="text-xl font-normal text-black">{post.createdA}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 w-4/5">
        <img src={post.fileUrl} alt="" className="w-[457px] h-[291px]" />
        <p className="text-xl font-normal text-black w-full">{post.text}</p>
      </div>
      <div className="flex justify-start items-center w-full px-16 gap-8">
        <div className="flex justify-center items-center gap-2.5">
          <img src={likeSign} alt="" className="size-[35px]" />
          <p className="text-xl font-normal text-black">{post.likesCount}</p>
        </div>
        <div className="flex justify-center items-center">
          <img src={commentSign} alt="" className="size-[35px]" />
        </div>
      </div>
    </div>
  );
};
