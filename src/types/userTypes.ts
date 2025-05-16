import { Cuisine } from "@/types/recipeTypes";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  dateEarned: string;
}

export interface Order {
  id: string;
  userId: string;
  phoneNumber: string;
  email: string;
  description: string;
}

export interface OrderForm {
  userId: string;
  phoneNumber: string;
  email: string;
  description: string;
}

export interface PaidService {
  id: string;
  userId: string;
  title: string;
  description: string;
}

export interface PaidServiceForm {
  userId: string;
  title: string;
  description: string;
}

export enum UserRole {
  User = "User",
  Cook = "Cook",
  Admin = "Admin",
}

export interface User {
  id: string;
  name: string;
  level: number;
  role: UserRole;
  subscriptionsCount: number;
  averageRating: number;
  achievements: Achievement[];
  fileUrl: string;
}

export interface UserRating {
  fileUrl: string;
  userId: string;
  userName: string;
  averageRating: number;
  cuisine: Cuisine;
  isVerified: boolean;
}

export interface UserRatingResponse {
  users: UserRating[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
