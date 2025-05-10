import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { RecipeStep, RecipeStepForm } from "@/types/recipeTypes";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";

export const recipeStepApi = createApi({
  reducerPath: "recipeStepApi",
  baseQuery,
  tagTypes: ["RecipeStep"],
  endpoints: (builder) => ({
    createRecipeStep: builder.mutation<RecipeStep, RecipeStepForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE_STEP.BASE}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateRecipeStepMutation } = recipeStepApi;
