import clsx from "clsx";
import { Link, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dropdown from "../components/Dropdown";
import { ROUTS_PATH } from "../menu.tsx";
import logo from "assets/logo-zayaz.jpg";
import Button from "components/Button";

import { useGetUserQuery, userApi } from "../services/store.ts";

function Layout() {
  const user = useLoaderData() as any;

  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    userApi.util.resetApiState();
    navigate("/sign-in");
  };
  const accessToken = localStorage.getItem("access_token");
  const { data: currentUser } = useGetUserQuery({});

  return (
    <>
      <header className="prose sticky top-0 z-[100] max-w-full bg-lime-200 py-1 shadow-[0px_4px_5px_0px_#ff00000d]">
        <div className="container m-auto mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={logo} alt="M" width="160" height="160" className="rounded-full" />
            <h1 className="m-0 ml-10">
              Турнир юных математиков <br />
              им. академика Н.Г. Басова <br /> (Воронежская обл.)
            </h1>
          </div>

          {user?.isAdmin && accessToken && (
            <Button
              className={clsx({
                "!bg-red-500": location?.search === "?edit",
              })}
              onClick={() => navigate("?edit")}
            >
              {location?.search === "?edit" ? "Включен режим редактирования" : "Редактировать"}
            </Button>
          )}

          <Button onClick={handleLogout}>{accessToken ? "Выйти" : "Войти"}</Button>
        </div>

        <nav className="container m-auto">
          <ul className="container flex justify-between">
            {Object.values(ROUTS_PATH)
              .filter((rout: any) => !rout?.isAdmin || currentUser?.data?.isAdmin)
              .map(({ path, title, submenu }: any, index) => (
                <li className="relative cursor-pointer list-none p-0">
                  {submenu ? (
                    <Dropdown title={title} key={`${index}_${path}`} submenu={submenu} />
                  ) : (
                    <Link
                      className="peer relative z-10 m-0 block rounded px-2 text-inherit no-underline hover:border-x-orange-400 hover:bg-white hover:text-orange-400 hover:shadow"
                      to={path}
                    >
                      {title}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </nav>
      </header>

      <main className="prose min-h-[calc(100vh-470px)] max-w-full">
        <Outlet />
      </main>

      <footer className="prose max-w-full gap-4 bg-lime-200 px-20 py-4">
        <ul className="grid grid-cols-[100px_1fr_1fr_1fr] gap-x-2 justify-self-center">
          <li>Воронеж</li>
          <li className="hover:text-orange-400">
            Тел.:
            <a href="tel:+79202210274">+7 (920) 221-02-74</a>
          </li>

          <li className="hover:text-orange-400">
            E-mail: <a href="mailto:admin@math-championship.ru">org@ipokengu.ru</a>
          </li>

          <li className="hover:text-orange-400">
            <a href="https://vk.com" target="_blank">
              Группа ВКонтакте
            </a>
          </li>
        </ul>
      </footer>

      <ToastContainer />
    </>
  );
}

export default Layout;
