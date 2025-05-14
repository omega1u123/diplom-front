import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { baseQuery } from "@/API/baseQuery";
import { Contest } from "@/types/contestTypes";

export const contestApi = createApi({
  reducerPath: "contestApi",
  baseQuery,
  tagTypes: ["Contests"],
  endpoints: (builder) => ({
    getActiveContests: builder.query<Contest[], void>({
      query: () => ({
        url: `${BASE_URL}${API_ROUTES.CONTEST.BASE}/active`,
        method: "GET",
      }),
      providesTags: ["Contests"],
    }),
    getInActiveContests: builder.query<Contest[], void>({
      query: () => ({
        url: `${BASE_URL}${API_ROUTES.CONTEST.BASE}/notActive`,
        method: "GET",
      }),
      providesTags: ["Contests"],
    }),
    addRecipeToContest: builder.mutation<
      void,
      { contestId: string; recipeId: string }
    >({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.CONTEST.BASE}/addRecipeToContest`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contests"],
    }),
    addVote: builder.mutation<void, { contestId: string; recipeId: string }>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.CONTEST.BASE}/addVote`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contests"],
    }),
  }),
});

export const { useGetActiveContestsQuery, useGetInActiveContestsQuery } =
  contestApi;
