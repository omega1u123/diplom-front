export interface Achievement {
  id: string;
  name: string;
  description: string;
  dateEarned: string;
}
export interface User {
  id: string;
  name: string;
  level: number;
  role: string;
  subscriptionsCount: number;
  averageRating: number;
  achievements: Achievement[];
  fileUrl: string;
}

export interface UserRating {
  imgUrl: string;
  userId: string;
  userName: string;
  averageRating: number;
  cuisingType: string;
  isVerified: boolean;
}

export interface UserRatingResponse {
  users: UserRating[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
