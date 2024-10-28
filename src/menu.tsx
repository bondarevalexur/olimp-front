export const ROUTS_PATH = {
  main: {
    title: "Главная",
    submenu: [
      {
        path: "/",
        title: "О конкурсе",
        remoteId: 1,
      },
      {
        path: "/codex",
        title: "Устав",
        remoteId: 11,
      },
      {
        path: "/news",
        title: "Новости",
        remoteId: 12,
      },
    ],
  },
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
