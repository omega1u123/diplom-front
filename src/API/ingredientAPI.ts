import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { Ingredient, IngredientForm } from "@/types/recipeTypes";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";

export const ingredientApi = createApi({
  reducerPath: "ingredientApi",
  baseQuery,
  tagTypes: ["Ingredients"],
  endpoints: (builder) => ({
    createIngredient: builder.mutation<Ingredient, IngredientForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.INGREDIENT.BASE}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateIngredientMutation } = ingredientApi;
