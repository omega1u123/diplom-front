import { User } from "@/types/userTypes";

export enum Complexity {
  Easy = "0",
  Medium = "1",
  Hard = "2",
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: Cuisine;
  cookingTime: number;
  complexity: Complexity;
  ingredientList: Ingredient[];
  recipeStepList: RecipeStep[];
  proteins: number;
  fats: number;
  carb: number;
  dietaryRestrictionList: string[];
  description: string;
  user: User;
  fileUrl: string | null;
}

export interface RecipeForm {
  name: string;
  cuisineId: string;
  cookingTime: number;
  complexity: number;
  ingredientIdList: string[];
  recipeStepIdList: string[];
  proteins: number;
  fats: number;
  carb: number;
  calories: number;
  dietaryRestrictionIdList: string[];
  description: string;
  userId: string;
  fileUrl: string | null;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
}

export interface IngredientForm {
  name: string;
  quantity: number;
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  description: string;
  imageUrl: string | null;
}

export interface RecipeStepForm {
  stepNumber: number;
  description: string;
  imageUrl: string | null;
}

export interface DietaryRestriction {
  id: string;
  name: string;
}

export interface DietaryRestrictionForm {
  name: string;
}

export interface Cuisine {
  id: string;
  name: string;
}
