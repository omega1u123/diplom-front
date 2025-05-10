import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import { Recipe, RecipeForm } from "@/types/recipeTypes";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery,
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    createRecipe: builder.mutation<Recipe, RecipeForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE_STEP.BASE}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateRecipeMutation } = recipeApi;
