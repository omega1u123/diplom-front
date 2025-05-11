import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import { Post, PostForm } from "@/types/postTypes";

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
    }),
  }),
});

export const { useCreatePostMutation } = postApi;
