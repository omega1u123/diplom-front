import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchMedia: builder.mutation<string, File>({
      query: (file) => ({
        url: `${BASE_URL}${API_ROUTES.MEDIA.BASE}?mimetype=${file.type}`,
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useFetchMediaMutation } = mediaApi;
