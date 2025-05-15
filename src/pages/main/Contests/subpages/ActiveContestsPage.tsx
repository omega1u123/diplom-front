import { useGetActiveContestsQuery } from "@/API/contestAPI";
import { ContestCard } from "@/pages/main/Contests/components/ContestCard";

export default function ActiveContestsPage() {
  const { data, isLoading } = useGetActiveContestsQuery();
  return (
    <div className="flex flex-wrap justify-start items-start w-full pt-6 gap-3">
      {isLoading ? (
        <p>Загрузка</p>
      ) : (
        data?.map((x) => <ContestCard key={x.id} contest={x} />)
      )}
    </div>
  );
}
