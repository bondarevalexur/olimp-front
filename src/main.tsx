import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTS } from "./routs.tsx";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./services/store.ts";

const router = createBrowserRouter(ROUTS);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    ,
  </Provider>,
);
