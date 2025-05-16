import { useLikePostMutation } from "@/API/postAPI";
import { commentSign, likeSign } from "@/assets";
import { Post } from "@/types/postTypes";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: Post;
  openModal: () => void;
  setPostId: Dispatch<SetStateAction<string>>;
  userId: string;
}

export const PostCard = ({
  post,
  openModal,
  setPostId,
  userId,
}: PostCardProps) => {
  const navigate = useNavigate();
  const [like] = useLikePostMutation();

  const submitLike = async () => {
    try {
      await like({ userId, postId: post.id });
    } catch {
      return;
    }
  };

  const handleModalOpen = () => {
    setPostId(post.id);
    openModal();
  };

  return (
    <div className="flex flex-col justify-start items-center w-[683px] px-3 py-4 gap-8 bg-gray-200 rounded-xl ">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2.5">
          {post.userFileUrl === null ? (
            <div
              onClick={() => {
                navigate(`/profile/${post.userId}`);
              }}
              className="flex justify-center items-center w-[35px] h-[35px] bg-gray-100 rounded-xl text-xl cursor-pointer"
            >
              <p>{post.username[0].toUpperCase()}</p>
            </div>
          ) : (
            <img
              onClick={() => {
                navigate(`/profile/${post.userId}`);
              }}
              src={post.userFileUrl}
              alt=""
              className="w-[35px] h-[35px] rounded-xl cursor-pointer"
            />
          )}
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
          <img
            src={likeSign}
            alt=""
            className="size-[35px] cursor-pointer"
            onClick={submitLike}
          />
          <p className="text-xl font-normal text-black">{post.likesCount}</p>
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          <img
            src={commentSign}
            alt=""
            className="size-[35px]"
            onClick={handleModalOpen}
          />
        </div>
      </div>
    </div>
  );
};
