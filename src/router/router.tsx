import { ProtectedRoute } from "@/components/protectedRoute";
import AuthPage from "@/pages/auth/AuthPage";
import LoginForm from "@/pages/auth/components/LoginForm";
import RegisterForm from "@/pages/auth/components/RegisterForm";
import MainPage from "@/pages/main/MainPage";
import RecipesPage from "@/pages/main/Recipes/RecipesPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import { routesNames } from "@/utils/routesNames";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PostsPage from "./../pages/main/Posts/PostsPage";
import RatingPage from "@/pages/main/Rating/RatingPage";
import CreateRecipePage from "@/pages/main/Recipes/createRecipe/CreateRecipePage";
import ShowRecipesPage from "@/pages/main/Recipes/showRecipes/ShowRecipesPage";
import ShowRatingPage from "@/pages/main/Rating/showRating/ShowRatingPage";
import RecipePage from "@/pages/main/Recipes/recipePage.tsx/RecipePage";
import ShowPostPage from "@/pages/main/Posts/showPost/ShowPostPage";

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          { path: routesNames.authLogin, element: <LoginForm /> },
          { path: routesNames.authRegister, element: <RegisterForm /> },
        ],
      },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Navigate to="/recipes" replace />,
          },
          {
            path: "/",
            element: <MainPage />,
            children: [
              {
                path: routesNames.recipesPath,
                element: <RecipesPage />,
                children: [
                  {
                    index: true,
                    element: <ShowRecipesPage />,
                  },
                  {
                    path: "create",
                    element: <CreateRecipePage />,
                  },
                  {
                    path: ":id",
                    element: <RecipePage />,
                  },
                ],
              },
              {
                path: routesNames.postsPath,
                element: <PostsPage />,
                children: [
                  {
                    index: true,
                    element: <ShowPostPage />,
                  },
                ],
              },
              {
                path: routesNames.ratingPath,
                element: <RatingPage />,
                children: [
                  {
                    index: true,
                    element: <ShowRatingPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default router;
