import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

import { api } from "services/api.tsx";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: api,
  endpoints: (builder) => ({
    getUser: builder.query({
      queryFn: async () => {
        try {
          const { data } = await api.get("users/show");
          return { data };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return { error: error?.response };
          } else {
            return { error };
          }
        }
      },
    }),
    activateUser: builder.mutation({
      queryFn: async (token) => {
        const { data } = await api.get(`users/activate?activation_code=${token}`);
        return { data };
      },
    }),
    signInUser: builder.mutation({
      queryFn: async (body) => {
        try {
          const { data } = await api.post("token/", body);

          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);

          return { data: undefined };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return { error: error?.response };
          } else {
            return { error };
          }
        }
      },
    }),
    resetUserPassword: builder.mutation({
      queryFn: async (body) => {
        try {
          const { data } = await api.patch("users/reset_password/", body);

          return { data };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return { error: error?.response };
          } else {
            return { error };
          }
        }
      },
    }),
    registerUser: builder.mutation({
      queryFn: async (body) => {
        try {
          const { data } = await api.post("users/", body);
          return { data };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return { error: error?.response };
          } else {
            return { error };
          }
        }
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useActivateUserMutation,
  useSignInUserMutation,
  useResetUserPasswordMutation,
} = userApi;
