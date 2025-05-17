import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { baseQuery } from "@/API/baseQuery";
import { Contest, ContestForm, Vote, Winner } from "@/types/contestTypes";

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
    createContest: builder.mutation<Contest, ContestForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.CONTEST.BASE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contests"],
    }),
    getContestById: builder.query<Contest, string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.CONTEST.BASE}/${id}`,
        method: "GET",
      }),
      providesTags: ["Contests"],
    }),
    getRecipeVotes: builder.query<Vote, string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.CONTEST.BASE}/vote/${id}`,
        method: "GET",
      }),
      providesTags: ["Contests"],
    }),
    getWinner: builder.query<Winner, string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.CONTEST.BASE}/${id}/winner`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetActiveContestsQuery,
  useGetInActiveContestsQuery,
  useAddRecipeToContestMutation,
  useAddVoteMutation,
  useCreateContestMutation,
  useGetContestByIdQuery,
  useGetRecipeVotesQuery,
  useGetWinnerQuery,
} = contestApi;
