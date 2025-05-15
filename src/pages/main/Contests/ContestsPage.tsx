import { NavButton } from "@/components/NavButton";
import { routesNames } from "@/utils/routesNames";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const NavArray = [
  { text: "Активные", path: `${routesNames.contestPath}/active` },
  { text: "Неактивные", path: `${routesNames.contestPath}/not-active` },
];

export default function ContestsPage() {
  const navigate = useNavigate();
  const { id, contestId, recipeId } = useParams();
  const location = useLocation();
  const isDif =
    location.pathname === "/contests/create" ||
    location.pathname === `/contests/${id}` ||
    location.pathname === `/contests/${contestId}/recipe/${recipeId}`;
  return (
    <section className="flex flex-col justify-center items-center px-16 py-9">
      {!isDif && (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-5">
            {NavArray.map((x, index) => (
              <NavButton
                key={index}
                text={x.text}
                path={x.path}
                activeColor="bg-blue-200"
              />
            ))}
          </div>
          <button
            onClick={() => {
              navigate("create");
            }}
            className="text-xl font-semibold text-white flex justify-center items-center px-8 py-1 rounded-xl bg-blue-700 cursor-pointer hover:bg-blue-800"
          >
            Создать
          </button>
        </div>
      )}

      <Outlet />
    </section>
  );
}
