import { useGetPostsByUserIdQuery } from "@/API/postAPI";
import { PostProfileCard } from "@/pages/main/Profile/components/PostProfileCard";
import { useParams } from "react-router-dom";

export default function ProfilePostPage() {
  const { id } = useParams();
  const { data: posts, isLoading } = useGetPostsByUserIdQuery(id!);
  return (
    <div className="flex flex-wrap justify-start items-center gap-14">
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        posts?.map((x) => <PostProfileCard key={x.id} post={x} />)
      )}
      {posts === null || posts?.length === 0 ? (
        <div>
          <p>Нет постов</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
