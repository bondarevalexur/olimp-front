import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ROUTS_PATH } from "../routs.tsx";
// import logo from "../assets/golden-ratio.jpg";
import logo from "../assets/logo-zayaz.jpg";
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
    navigate("/sign-in");
  };
  const accessToken = localStorage.getItem("access_token");

  return (
    <>
      <header className="prose max-w-full py-1 sticky z-[100] top-0 shadow-[0px_4px_5px_0px_#ff00000d] bg-lime-200">
        <div className="flex items-center justify-between container m-auto gap-4 mb-5">
          <div className="flex items-center">
            <img
              src={logo}
              alt="M"
              width="160"
              height="160"
              className="rounded-full"
            />
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
              {location?.search === "?edit"
                ? "Включен режим редактирования"
                : "Редактировать"}
            </Button>
          )}

          <Button onClick={handleLogout}>
            {accessToken ? "Выйти" : "Войти"}
          </Button>
        </div>

        <nav className="container m-auto">
          <ul className="flex justify-between container">
            {Object.values(ROUTS_PATH).map(({ path, title }, index) => (
              <li
                key={`${index}_${path}`}
                className="list-none p-0 cursor-pointer relative"
              >
                <Link
                  className="z-10 relative block rounded no-underline text-inherit px-2 m-0 peer hover:bg-white hover:shadow hover:border-x-orange-400 hover:text-orange-400"
                  to={path}
                >
                  {title}
                </Link>

                <img
                  className="absolute opacity-0 -left-4 top-0 transition-all m-0 -z-100 peer-hover:opacity-100 peer-hover:-top-10 peer-hover:-rotate-45"
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

      <main className="prose max-w-full min-h-[calc(100vh-470px)]">
        <Outlet />
      </main>

      <footer className="prose max-w-full bg-lime-200 px-20 py-4 gap-4">
        <ul className="justify-self-center grid grid-cols-[100px_1fr_1fr_1fr] gap-x-2">
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
        {/*<ul className="justify-self-center">*/}
        {/*  {Object.values(ROUTS_PATH)*/}
        {/*    .slice(0, Math.round(Object.values(ROUTS_PATH).length / 2))*/}
        {/*    .map(({ path, title }, index) => (*/}
        {/*      <li*/}
        {/*        key={`${index}_${path}`}*/}
        {/*        className="cursor-pointer hover:text-orange-400"*/}
        {/*      >*/}
        {/*        <Link to={path}>{title}</Link>*/}
        {/*      </li>*/}
        {/*    ))}*/}
        {/*</ul>*/}

        {/*<ul className="justify-self-center">*/}
        {/*  {Object.values(ROUTS_PATH)*/}
        {/*    .slice(Math.round(Object.values(ROUTS_PATH).length / 2))*/}
        {/*    .map(({ path, title }, index) => (*/}
        {/*      <li*/}
        {/*        key={`${index}_${path}`}*/}
        {/*        className="cursor-pointer hover:text-orange-400"*/}
        {/*      >*/}
        {/*        <Link to={path}>{title}</Link>*/}
        {/*      </li>*/}
        {/*    ))}*/}
        {/*</ul>*/}
      </footer>
    </>
  );
}

export default Layout;
