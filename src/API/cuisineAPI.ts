import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import { Cuisine } from "@/types/recipeTypes";

export const cuisineApi = createApi({
  reducerPath: "cuisineApi",
  baseQuery,
  tagTypes: ["Cuisine"],
  endpoints: (builder) => ({
    getCuisine: builder.query<Cuisine[], void>({
      query: () => ({
        url: `${BASE_URL}${API_ROUTES.CUISINE.BASE}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCuisineQuery } = cuisineApi;
