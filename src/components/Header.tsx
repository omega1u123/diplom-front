import { NavButton } from "@/components/NavButton";
import { routesNames } from "@/utils/routesNames";

const NavArray = [
  { text: "Рецепты", path: routesNames.recipesPath },
  { text: "Посты", path: routesNames.postsPath },
  { text: "Рейтинг", path: routesNames.ratingPath },
];
const Header = () => {
  return (
    <div className="flex justify-between items-center px-11 h-20 w-full bg-blue-700">
      <nav className="flex justify-center items-center gap-6">
        {NavArray.map((nav, index) => (
          <NavButton key={index} text={nav.text} path={nav.path} />
        ))}
      </nav>
      <div className="flex justify-center items-center gap-6">
        <NavButton
          text={"Мой профиль"}
          width={36}
          path={routesNames.profilePath}
        />
        <button
          className={`flex justify-center items-center w-24 h-9 px-1.5 py-1 rounded-[12px] cursor-pointer bg-white`}
        >
          <p className="text-xl font-normal text-black">Выйти</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
