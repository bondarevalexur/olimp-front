import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

import { api } from "services/api";

export const applicationsApi = createApi({
  reducerPath: "applications",
  baseQuery: api,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getApplications: builder.query({
      queryFn: async () => {
        try {
          const { data } = await api.get("applications/");
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
    updateApplication: builder.mutation({
      queryFn: async (body) => {
        try {
          const { data } = await api.patch("applications/", body);
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
    createApplication: builder.mutation({
      queryFn: async (body) => {
        try {
          const { data } = await api.post("applications/", body);
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
  useGetApplicationsQuery,
  useUpdateApplicationMutation,
  useCreateApplicationMutation,
} = applicationsApi;
