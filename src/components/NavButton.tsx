import { useLocation, useNavigate } from "react-router-dom";

interface NavButtonProps {
  text: string;
  path: string;
  activeColor?: string;
  inActiveColor?: string;
}
export const NavButton = ({
  text,
  path,
  activeColor = "bg-white",
  inActiveColor = "bg-gray-400",
}: NavButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith(`/${path}`);
  return (
    <button
      onClick={() => {
        navigate(`/${path}`);
      }}
      className={`flex justify-center items-center  h-9 px-3 py-1 rounded-[12px] cursor-pointer ${
        isActive ? activeColor : inActiveColor
      }`}
    >
      <p className="text-xl font-normal text-black">{text}</p>
    </button>
  );
};
