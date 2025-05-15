import { Cuisine, DietaryRestriction, Recipe } from "@/types/recipeTypes";

export interface Vote {
  id: string;
  voteCount: number;
  recipeId: string;
  contestId: string;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  dietaryRestrictionList: DietaryRestriction[];
  cuisine: Cuisine;
  recipeList: Recipe[];
  voteList: Vote[];
  participantsCount: number;
  isActive: boolean;
}

export interface ContestForm {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  dietaryRestrictionIdList: string[];
  cuisineId: string[];
}
