export const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/Auth/login",
    REGISTER: "/api/Auth/register",
    GET_INFO: "/api/User/currentUser",
    REFRESH_TOKEN: "/api/Auth/refresh",
  },
  USER: {
    BASE: "/api/User",
    RATING: "/api/User/ratings",
    SERVICE: "/api/PaidService",
    ORDER: "/api/Order",
  },
  INGREDIENT: {
    BASE: "/api/Ingredient",
    BY_NAME: "/api/Ingredient/byName",
  },
  POST: {
    BASE: "/api/Post",
    USER: "/api/Post/by-user",
    LIKE: "/api/Post/like",
  },
  RECIPE: {
    BASE: "/api/recipe",
    SAVE: "/api/savedRecipe/saveRecipe",
    SAVED: "/api/savedRecipe/savedRecipeList",
    USER: "/api/recipe/user",
    FILTER: "/api/recipe/filter",
  },
  RECIPE_STEP: {
    BASE: "/api/RecipeStep",
  },
  DIETARY_RESTRICTION: {
    BASE: "/api/DietaryRestriction",
  },
  CUISINE: {
    BASE: "/api/Cuisine",
  },
  MEDIA: {
    BASE: "/api/file",
  },
  COMMENT: {
    BASE: "/api/Comment",
  },
};

export const routesNames = {
  authLogin: "login",
  authRegister: "register",
  recipesPath: "recipes",
  postsPath: "posts",
  ratingPath: "rating",
  profilePath: "profile",
};
