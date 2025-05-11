import { CreatePostModal } from "@/pages/main/Posts/components/CreatePostModal";
import { useRef } from "react";

export default function ShowPostPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal(); // Opens the modal
    }
  };
  return (
    <section className="flex justify-center w-full py-2.5 px-5">
      <div className="flex flex-col items-start">
        <button
          onClick={openModal}
          className="flex justify-center items-center px-2 py-1 bg-blue-200 rounded-xl cursor-pointer hover:bg-blue-300 text-xl font-normal text-black"
        >
          Создать пост
        </button>
        <div></div>
      </div>
      <CreatePostModal ref={dialogRef} />
    </section>
  );
}
