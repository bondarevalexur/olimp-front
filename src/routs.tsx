import Layout from "./layout";
import AccountActivation from "./pages/AccountActivation";
import ChangePassword from "./pages/ChangePassword";
import ConcourseRegistration from "./pages/ConcourseRegistration/index.jsx";
import ConcourseRegistrationList from "./pages/ConcourseRegistrationList/index.jsx";
import MainPage from "./pages/Main";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import { api } from "./services/api.tsx";

export const ROUTS_PATH = {
  main: { path: "/", title: "О конкурсе", remoteId: 1 },
  codex: { path: "/codex", title: "Устав", remoteId: 6 },
  news: { path: "/news", title: "Новости", remoteId: 7 },
  method: { path: "method", title: "Методические Материалы", remoteId: 2 },
  contacts: { path: "contacts", title: "Контакты", remoteId: 3 },
  teachers: { path: "teachers", title: "Педагогам", remoteId: 4 },
  participants: { path: "participants", title: "Участникам", remoteId: 5 },
  reg: { path: "reg", title: "Регистрация на турнир" },
  "reg-list": {
    path: "reg-list",
    title: "Список регистраций на турнир",
    isAdmin: true,
  },
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
        const user = await api.get("/users/show/");
        return user.data;
      }

      return true;
    },
    children: [
      {
        index: true,
        element: <MainPage remoteId={ROUTS_PATH.main.remoteId} />,
      },
      ...Object.values(ROUTS_PATH)
        .filter(({ remoteId }: any) => Boolean(remoteId))
        ?.map(({ remoteId, path }: any) => ({
          path,
          element: <MainPage remoteId={remoteId} />,
        })),
      // {
      //   path: ROUTS_PATH.method.path,
      //   element: <MainPage remoteId={ROUTS_PATH.method.remoteId} />,
      // },
      // {
      //   path: ROUTS_PATH.contacts.path,
      //   element: <MainPage remoteId={ROUTS_PATH.contacts.remoteId} />,
      // },
      // {
      //   path: ROUTS_PATH.teachers.path,
      //   element: <MainPage remoteId={ROUTS_PATH.teachers.remoteId} />,
      // },
      // {
      //   path: ROUTS_PATH.participants.path,
      //   element: <MainPage remoteId={ROUTS_PATH.participants.remoteId} />,
      // },
      {
        path: ROUTS_PATH.reg.path,
        element: <ConcourseRegistration />,
      },
      {
        path: ROUTS_PATH?.["reg-list"].path,
        element: <ConcourseRegistrationList />,
      },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "profile-activate", element: <AccountActivation /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
];
