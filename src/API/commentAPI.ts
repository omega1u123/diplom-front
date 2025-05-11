import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import { Comment, CommentForm } from "@/types/commentTypes";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery,
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getPostComments: builder.query<Comment[], { postId: string }>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.COMMENT.BASE}/post/${data.postId}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
    postComment: builder.mutation<Comment, CommentForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.COMMENT.BASE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetPostCommentsQuery, usePostCommentMutation } = commentApi;
