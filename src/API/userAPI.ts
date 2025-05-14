import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { User, UserRatingResponse } from "@/types/userTypes";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getRatingUsers: builder.query<
      UserRatingResponse,
      { page: number; pageSize: number }
    >({
      query: (args = { page: 1, pageSize: 9999 }) => ({
        url: `${BASE_URL}${API_ROUTES.USER.RATING}`,
        params: args,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.USER.BASE}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRatingUsersQuery, useGetUserByIdQuery } = userApi;
