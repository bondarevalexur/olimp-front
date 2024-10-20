import { createApi } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api.tsx";

export const applicationsApi = createApi({
  reducerPath: "applications",
  baseQuery: api,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getApplications: builder.query({
      queryFn: async () => {
        try {
          const user = await api.get("applications/");
          return { data: user };
        } catch (error) {
          return { error };
        }
      },
    }),
    updateApplication: builder.mutation({
      queryFn: async (data) => {
        try {
          const user = await api.patch("applications/", data);
          return { data: user };
        } catch (error) {
          return { error };
        }
      },
    }),
    createApplication: builder.mutation({
      queryFn: async (data) => {
        try {
          const user = await api.post("applications/", data);
          return { data: user };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useUpdateApplicationMutation,
  useCreateApplicationMutation,
} = applicationsApi;

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: api,
  endpoints: (builder) => ({
    getUser: builder.query({
      queryFn: async () => {
        try {
          const user = await api.get("users/show");
          return { data: user };
        } catch (error) {
          return { error };
        }
      },
    }),
    registerUser: builder.mutation({
      queryFn: async () => {
        try {
          const user = await api.get("users/show");
          return { data: user };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;

export const store = configureStore({
  reducer: {
    [applicationsApi.reducerPath]: applicationsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(applicationsApi.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);
