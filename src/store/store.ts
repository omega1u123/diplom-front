import { authApi } from "@/API/authAPI";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { injectStore } from "@/API/baseQuery";
import { ingredientApi } from "@/API/ingredientAPI";
import { recipeStepApi } from "@/API/recipeStepAPI";
import { dietaryRestrictionApi } from "@/API/dietaryRestrictionAPI";
import { recipeApi } from "@/API/recipeAPI";
import { mediaApi } from "@/API/mediaAPI";
import { cuisineApi } from "@/API/cuisineAPI";
import { userApi } from "@/API/userAPI";
import { postApi } from "@/API/postAPI";
import { commentApi } from "@/API/commentAPI";
import { contestApi } from "@/API/contestAPI";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [ingredientApi.reducerPath]: ingredientApi.reducer,
    [recipeStepApi.reducerPath]: recipeStepApi.reducer,
    [dietaryRestrictionApi.reducerPath]: dietaryRestrictionApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [cuisineApi.reducerPath]: cuisineApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [contestApi.reducerPath]: contestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(ingredientApi.middleware)
      .concat(recipeStepApi.middleware)
      .concat(dietaryRestrictionApi.middleware)
      .concat(recipeApi.middleware)
      .concat(mediaApi.middleware)
      .concat(cuisineApi.middleware)
      .concat(userApi.middleware)
      .concat(postApi.middleware)
      .concat(commentApi.middleware)
      .concat(contestApi.middleware),
});

injectStore(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
