import { NavButton } from "@/components/NavButton";
import { routesNames } from "@/utils/routesNames";
import { Outlet } from "react-router-dom";

const NavArray = [
  { text: "Активные", path: `${routesNames.recipesPath}/active` },
  { text: "Неактивные", path: `${routesNames.recipesPath}/not-active` },
];

export default function ContestsPage() {
  return (
    <div className="flex flex-col justify-center items-center px-16 py-9">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-5">
          {NavArray.map((x, index) => (
            <NavButton key={index} text={x.text} path={x.path} />
          ))}
        </div>
        <button className="text-xl font-semibold text-white flex justify-center items-center px-8 py-1 rounded-xl bg-blue-700 cursor-pointer hover:bg-blue-800">
          Создать
        </button>
      </div>
      <Outlet />
    </div>
  );
}
