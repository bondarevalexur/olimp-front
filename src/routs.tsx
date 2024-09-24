import Layout from "./layout";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/Main";
import AuthPage from "./pages/Auth";
import ConcourseRegistration from "./pages/ConcourseRegistration";
import { api } from "./api.tsx";

export const ROUTS_PATH = {
  main: { path: "/", title: "Главная", remoteId: 1 },
  method: { path: "method", title: "Методические Материалы", remoteId: 2 },
  contacts: { path: "contacts", title: "Контакты", remoteId: 3 },
  teachers: { path: "teachers", title: "Педагогам", remoteId: 4 },
  participants: { path: "participants", title: "Участникам", remoteId: 5 },
  reg: { path: "reg", title: "Регистрация на турнир" },
};

export const ROUTS = [
  {
    path: ROUTS_PATH.main.path,
    element: <Layout />,
    errorElement: <NotFound />,
    id: "layout",
    loader: async () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        const user = await api.get("/profile");
        return user.data;
      }

      return true;
    },
    children: [
      {
        index: true,
        element: <MainPage remoteId={ROUTS_PATH.main.remoteId} />,
      },
      {
        path: ROUTS_PATH.method.path,
        element: <MainPage remoteId={ROUTS_PATH.method.remoteId} />,
      },
      {
        path: ROUTS_PATH.contacts.path,
        element: <MainPage remoteId={ROUTS_PATH.contacts.remoteId} />,
      },
      {
        path: ROUTS_PATH.teachers.path,
        element: <MainPage remoteId={ROUTS_PATH.teachers.remoteId} />,
      },
      {
        path: ROUTS_PATH.participants.path,
        element: <MainPage remoteId={ROUTS_PATH.participants.remoteId} />,
      },
      {
        path: "reg",
        element: <ConcourseRegistration />,
      },
      { path: "auth", element: <AuthPage /> },
    ],
  },
];
