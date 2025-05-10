import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import { DietaryRestriction } from "@/types/recipeTypes";

export const dietaryRestrictionApi = createApi({
  reducerPath: "dietaryRestrictionApi",
  baseQuery,
  tagTypes: ["DietaryRestriction"],
  endpoints: (builder) => ({
    getDietaryRestrictions: builder.query<DietaryRestriction[], void>({
      query: () => ({
        url: `${BASE_URL}${API_ROUTES.DIETARY_RESTRICTION.BASE}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDietaryRestrictionsQuery } = dietaryRestrictionApi;
