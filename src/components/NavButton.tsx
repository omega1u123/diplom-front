import { useLocation, useNavigate } from "react-router-dom";

interface NavButtonProps {
  text: string;
  path: string;
}
export const NavButton = ({ text, path }: NavButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive =
    location.pathname === `/${path}` ||
    location.pathname.startsWith(`/${path}/`);
  return (
    <button
      onClick={() => {
        navigate(`/${path}`, { replace: true });
      }}
      disabled={isActive}
      className={`flex justify-center items-center  h-9 px-3 py-1 rounded-[12px] cursor-pointer ${
        isActive ? "bg-white" : "bg-gray-400"
      }`}
    >
      <p className="text-xl font-normal text-black">{text}</p>
    </button>
  );
};
