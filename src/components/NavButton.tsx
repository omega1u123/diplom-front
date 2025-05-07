import { useLocation, useNavigate } from "react-router-dom";

interface NavButtonProps {
  text: string;
  path: string;
  width?: number;
}
export const NavButton = ({ text, path, width = 24 }: NavButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === `/${path}`;
  return (
    <button
      onClick={() => {
        navigate(`/${path}`);
      }}
      disabled={isActive}
      className={`flex justify-center items-center w-${width} h-9 px-1.5 py-1 rounded-[12px] cursor-pointer ${
        isActive ? "bg-white" : "bg-gray-400"
      }`}
    >
      <p className="text-xl font-normal text-black">{text}</p>
    </button>
  );
};
