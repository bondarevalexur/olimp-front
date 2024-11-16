import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { applicationsApi, userApi, pageApi } from "./storeApi";

export const store = configureStore({
  reducer: {
    [applicationsApi.reducerPath]: applicationsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [pageApi.reducerPath]: pageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(applicationsApi.middleware)
      .concat(userApi.middleware)
      .concat(pageApi.middleware),
});

setupListeners(store.dispatch);
