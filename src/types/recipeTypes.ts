export enum Complexity {
  Easy = "0",
  Medium = "1",
  Hard = "2",
}

export interface Recipe {
  name: string;
  cuisineId: string;
  cookingTime: number;
  complexity: Complexity;
  ingredientIdList: string[];
  recipeStepIdList: string[];
  proteins: number;
  fats: number;
  carb: number;
  dietaryRestrictionIdList: string[];
  userId: string;
  fileUrl: string | null;
}
