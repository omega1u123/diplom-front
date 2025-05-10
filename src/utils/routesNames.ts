export const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/Auth/login",
    REGISTER: "/api/Auth/register",
    GET_INFO: "/api/User/currentUser",
    REFRESH_TOKEN: "/api/Auth/refresh-token",
  },
  INGREDIENT: {
    BASE: "/api/Ingredient",
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
    BASE: "/api/recipe/media",
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
