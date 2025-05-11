import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import { Post, PostForm, PostResponse } from "@/types/postTypes";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery,
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, PostForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.POST.BASE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    getPosts: builder.query<PostResponse, { page: string; pageSize: string }>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.POST.BASE}?page=${data.page}&pageSize=${data.pageSize}`,
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
    likePost: builder.mutation<void, { postId: string; userId: string }>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.POST.LIKE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery, useLikePostMutation } =
  postApi;
