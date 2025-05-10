export interface User {
  id: string;
  name: string;
  level: number;
  role: string;
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
