import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

import { api } from "services/api.tsx";

export const pageApi = createApi({
  reducerPath: "pages",
  baseQuery: api,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPage: builder.query({
      queryFn: async ({ id }) => {
        try {
          const { data } = await api.get(`pages/${id}`);
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
    getPageFiles: builder.query({
      queryFn: async ({ id }) => {
        try {
          const { data } = await api.get(`pages/${id}`);
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
    updatePage: builder.mutation({
      queryFn: async ({ id, body }) => {
        try {
          const { data } = await api.put(`pages/${id}/`, body);
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

export const { useGetPageQuery, useUpdatePageMutation } = pageApi;
