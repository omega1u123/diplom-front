import { useGetInfoQuery } from "@/API/authAPI";
import { NavButton } from "@/components/NavButton";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { clearAuthState, setAuthId } from "@/store/slices/authSlice";
import { removeFromLocalStorage } from "@/utils/localStorageUtils";
import { routesNames } from "@/utils/routesNames";
import { useEffect } from "react";

const NavArray = [
  { text: "Рецепты", path: routesNames.recipesPath },
  { text: "Посты", path: routesNames.postsPath },
  { text: "Рейтинг", path: routesNames.ratingPath },
];
const Header = () => {
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const { data } = useGetInfoQuery(accessToken!, {
    skip: accessToken === null,
  });

  useEffect(() => {
    if (data) {
      dispatch(setAuthId(data.id));
      console.log(data.id);
    }
  }, [data, dispatch]);

  const handleExit = () => {
    removeFromLocalStorage(["accessToken", "refreshToken"]);
    dispatch(clearAuthState());
  };
  return (
    <div className="flex justify-between items-center px-11 py-3 w-full bg-blue-700">
      <nav className="flex justify-center items-center gap-6">
        {NavArray.map((nav, index) => (
          <NavButton key={index} text={nav.text} path={nav.path} />
        ))}
      </nav>
      <div className="flex justify-center items-center gap-6">
        <NavButton
          text={"Мой профиль"}
          width={36}
          path={`${routesNames.profilePath}/${data?.id}`}
        />
        <button
          onClick={handleExit}
          className={`flex justify-center items-center w-24 h-9 px-1.5 py-1 rounded-[12px] cursor-pointer bg-white`}
        >
          <p className="text-xl font-normal text-black">Выйти</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
