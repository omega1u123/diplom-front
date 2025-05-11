export const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/Auth/login",
    REGISTER: "/api/Auth/register",
    GET_INFO: "/api/User/currentUser",
    REFRESH_TOKEN: "/api/Auth/refresh",
  },
  USER: {
    RATING: "/api/User/ratings",
  },
  INGREDIENT: {
    BASE: "/api/Ingredient",
    BY_NAME: "/api/Ingredient/byName",
  },
  RECIPE: {
    BASE: "/api/recipe",
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
};

export const routesNames = {
  authLogin: "login",
  authRegister: "register",
  recipesPath: "recipes",
  postsPath: "posts",
  ratingPath: "rating",
  profilePath: "profile",
};
