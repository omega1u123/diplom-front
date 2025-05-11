import { Recipe } from "@/types/recipeTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
  },
});

export const { setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
