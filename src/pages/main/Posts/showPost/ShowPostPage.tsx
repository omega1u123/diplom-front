import { useGetPostsQuery } from "@/API/postAPI";
import { useAppSelector } from "@/hooks/reduxHooks";
import { CreatePostModal } from "@/pages/main/Posts/components/CreatePostModal";
import { PostCard } from "@/pages/main/Posts/components/PostCard";
import { PostCommentsModal } from "@/pages/main/Posts/components/PostCommentsModal";
import { useRef, useState } from "react";

export default function ShowPostPage() {
  const userId = useAppSelector((state) => state.auth.userId);
  const [postId, setPostId] = useState<string>("");
  const createPostRef = useRef<HTMLDialogElement>(null);
  const openCreatePostModal = () => {
    if (createPostRef.current && !createPostRef.current.open) {
      createPostRef.current.showModal(); // Opens the modal
    }
  };

  const postCommentsRef = useRef<HTMLDialogElement>(null);
  const openPostCommentsModal = () => {
    if (postCommentsRef.current && !postCommentsRef.current.open) {
      postCommentsRef.current.showModal();
    }
  };

  const { data, isLoading } = useGetPostsQuery({ page: "1", pageSize: "9999" });
  return (
    <section className="flex justify-center w-full py-2.5 px-5">
      <div className="flex flex-col items-start">
        <button
          onClick={openCreatePostModal}
          className="flex justify-center items-center px-2 py-1 mb-2 bg-blue-200 rounded-xl cursor-pointer hover:bg-blue-300 text-xl font-normal text-black"
        >
          Создать пост
        </button>
        <div className="flex flex-col justify-start items-center gap-14">
          {isLoading ? (
            <div>Загрузка</div>
          ) : (
            data?.posts.map((x) => (
              <PostCard
                key={x.id}
                post={x}
                openModal={openPostCommentsModal}
                setPostId={setPostId}
                userId={userId}
              />
            ))
          )}
        </div>
      </div>
      <CreatePostModal ref={createPostRef} />
      <PostCommentsModal
        ref={postCommentsRef}
        postId={postId}
        userId={userId}
      />
    </section>
  );
}
