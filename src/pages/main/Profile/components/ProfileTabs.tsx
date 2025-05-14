import { routesNames } from "@/utils/routesNames";
import { useLocation, useNavigate } from "react-router-dom";

interface ProfileTabsProps {
  currentUserId: string;
  userId: string;
  isPaidSub: boolean | undefined;
}

export const ProfileTabs = ({
  currentUserId,
  userId,
  isPaidSub,
}: ProfileTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 0,
      name: "Платные рецепты",
      path: `/${routesNames.profilePath}/${userId}/paid-recipes`,
      isPaid: true,
    },
    {
      id: 1,
      name: "Рецепты",
      path: `/${routesNames.profilePath}/${userId}/recipes`,
      isPaid: false,
    },
    {
      id: 2,
      name: "Посты",
      path: `/${routesNames.profilePath}/${userId}/posts`,
      isPaid: false,
    },
    {
      id: 3,
      name: "Сохраненные рецепты",
      path: `/${routesNames.profilePath}/${userId}/saved-recipes`,
      isPaid: false,
    },
    {
      id: 4,
      name: "Достижения",
      path: `/${routesNames.profilePath}/${userId}/achievements`,
      isPaid: false,
    },
  ];

  const availableTabs = tabs.filter((tab) => {
    if (tab.isPaid) {
      return isPaidSub === true || currentUserId === userId;
    }
    return true;
  });
  return (
    <div className="flex gap-6">
      {availableTabs.map((x) => (
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
