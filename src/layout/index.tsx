import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ROUTS_PATH } from "../routs.tsx";
import logo from "../assets/golden-ratio.jpg";
import img1 from "../assets/img.png";
import clsx from "clsx";
import Button from "../components/Button";

function Layout() {
  const user = useLoaderData() as any;

  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth");
  };
  const accessToken = localStorage.getItem("access_token");

  return (
    <>
      <header className="prose max-w-full py-1 sticky z-[100] top-0 bg-white shadow-[0px_4px_5px_0px_#ff00000d]">
        <div className="flex items-center container m-auto gap-4 mb-5">
          <img src={logo} alt="M" width="50" height="50" />
          <h1 className="m-0">Математический Чемпионат</h1>

          {user?.isAdmin && accessToken && (
            <Button
              className={clsx({
                "!bg-red-500": location?.search === "?edit",
              })}
              onClick={() => navigate("?edit")}
            >
              {location?.search === "?edit"
                ? "Включен режим редактирования"
                : "Редактировать"}
            </Button>
          )}
          {accessToken && <Button onClick={handleLogout}>Выйти</Button>}
        </div>

        <nav className="container m-auto">
          <ul className="flex justify-between container">
            {Object.values(ROUTS_PATH).map(({ path, title }, index) => (
              <li
                key={`${index}_${path}`}
                className="list-none p-0 cursor-pointer relative [&:hover_img]:-top-10 [&:hover_a]:bg-white [&:hover_img]:opacity-100 [&:hover_img]:-rotate-45 border-x-2 border-x-gray-200 border-x-solid hover:shadow hover:border-x-orange-400 hover:text-orange-400"
              >
                <Link
                  className="z-10 relative no-underline text-inherit px-2 m-0"
                  to={path}
                >
                  {title}
                </Link>

                <img
                  className="absolute opacity-0 -left-4 top-0 transition-all m-0"
                  src={img1}
                  alt="M"
                  width="50"
                  height="50"
                />
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="prose max-w-full min-h-[calc(100vh-494px)]">
        <Outlet />
      </main>

      <footer className="prose max-w-full bg-orange-200 grid grid-cols-3 px-20 py-4 gap-4">
        <ul className="justify-self-center">
          <li>Воронеж</li>
          <li className="hover:text-orange-400">
            Тел.:
            <a href="tel:+79992326501">+7 (999) 232-65-01</a>
          </li>

          <li className="hover:text-orange-400">
            E-mail: <a href="mailto:org@ipokengu.ru">org@ipokengu.ru</a>
          </li>

          <li className="hover:text-orange-400">
            <a href="https://vk.com/ipokenguru" target="_blank">
              Группа ВКонтакте
            </a>
          </li>
        </ul>
        <ul className="justify-self-center">
          {Object.values(ROUTS_PATH)
            .slice(0, Math.round(Object.values(ROUTS_PATH).length / 2))
            .map(({ path, title }, index) => (
              <li
                key={`${index}_${path}`}
                className="cursor-pointer hover:text-orange-400"
              >
                <Link to={path}>{title}</Link>
              </li>
            ))}
        </ul>

        <ul className="justify-self-center">
          {Object.values(ROUTS_PATH)
            .slice(Math.round(Object.values(ROUTS_PATH).length / 2))
            .map(({ path, title }, index) => (
              <li
                key={`${index}_${path}`}
                className="cursor-pointer hover:text-orange-400"
              >
                <Link to={path}>{title}</Link>
              </li>
            ))}
        </ul>
      </footer>
    </>
  );
}

export default Layout;
