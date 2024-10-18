import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { ROUTS } from "./routs.tsx";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
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
