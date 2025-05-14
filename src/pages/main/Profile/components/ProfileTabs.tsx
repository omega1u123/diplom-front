import { routesNames } from "@/utils/routesNames";
import { useLocation, useNavigate } from "react-router-dom";

interface ProfileTabsProps {
  userId: string;
}

export const ProfileTabs = ({ userId }: ProfileTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 1,
      name: "Рецепты",
      path: `/${routesNames.profilePath}/${userId}/recipes`,
    },
    {
      id: 2,
      name: "Посты",
      path: `/${routesNames.profilePath}/${userId}/posts`,
    },
    {
      id: 3,
      name: "Сохраненные рецепты",
      path: `/${routesNames.profilePath}/${userId}/saved-recipes`,
    },
    {
      id: 4,
      name: "Достижения",
      path: `/${routesNames.profilePath}/${userId}/achievements`,
    },
  ];
  return (
    <div className="flex gap-6">
      {tabs.map((x) => (
        <button
          key={x.id}
          onClick={() => {
            navigate(x.path);
          }}
          className={`flex justify-center items-center px-4 py-2 rounded-xl text-xl font-normal cursor-pointer ${
            location.pathname === x.path
              ? "bg-blue-800 text-white hover:bg-blue-900"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {x.name}
        </button>
      ))}
    </div>
  );
};
