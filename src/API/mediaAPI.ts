import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchMedia: builder.mutation<string, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file); // Use a field name expected by your backend (e.g., "file")

        return {
          url: `${BASE_URL}${API_ROUTES.MEDIA.BASE}`,
          method: "POST",
          body: formData,
          // No manual Content-Type header needed
        };
      },
    }),
  }),
});

export const { useFetchMediaMutation } = mediaApi;
