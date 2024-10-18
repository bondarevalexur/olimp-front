import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api.tsx";

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApqwei",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: () => `applications`,
    }),
  }),
});

export const applicationsApi = createApi({
  reducerPath: "token",
  baseQuery: api,
  endpoints: (builder) => ({
    getToken: builder.query({
      queryFn: async () => {
        try {
          const user = await api.get("applications");
          // Return the result in an object with a `data` field
          return { data: user };
        } catch (error) {
          // Catch any errors and return them as an object with an `error` field
          return { error };
        }
      },
    }),
  }),
});

export const { useGetAlbumsQuery } = jsonServerApi;

export const store = configureStore({
  reducer: {
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerApi.middleware),
});

setupListeners(store.dispatch);
