import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import {
  Recipe,
  IRecipeFilter,
  RecipeForm,
  RecipeRateForm,
} from "@/types/recipeTypes";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery,
  tagTypes: ["Recipes", "SavedRecipes"],
  endpoints: (builder) => ({
    createRecipe: builder.mutation<Recipe, RecipeForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE.BASE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Recipes"],
    }),
    filterRecipe: builder.query<Recipe[], IRecipeFilter>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE.FILTER}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Recipes"],
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE.BASE}/${id}`,
        method: "GET",
      }),
      providesTags: ["Recipes"],
    }),
    saveRecipe: builder.mutation<Recipe, { recipeId: string; userId: string }>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE.SAVE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SavedRecipes"],
    }),
    getSavedRecipesByUserId: builder.query<Recipe[], string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE.SAVED}?userId=${id}`,
        METHOD: "GET",
      }),
      providesTags: ["Recipes"],
    }),
    getPublicRecipesByUserId: builder.query<Recipe[], string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE.PUBLIC}/${id}`,
        METHOD: "GET",
      }),
      providesTags: ["Recipes"],
    }),
    getPrivateRecipesByUserId: builder.query<Recipe[], string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE.PAID}/${id}`,
        METHOD: "GET",
      }),
      providesTags: ["Recipes"],
    }),
    rateRecipe: builder.mutation<void, RecipeRateForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.RECIPE.BASE}/rate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Recipes"],
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useFilterRecipeQuery,
  useGetRecipeByIdQuery,
  useGetSavedRecipesByUserIdQuery,
  useGetPublicRecipesByUserIdQuery,
  useGetPrivateRecipesByUserIdQuery,
  useRateRecipeMutation,
  useSaveRecipeMutation,
} = recipeApi;
