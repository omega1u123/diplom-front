export interface PostForm {
  text: string;
  userId: string;
  fileUrl: string;
}

export interface Post {
  id: string;
  text: string;
  likesCount: number;
  userId: string;
  username: string;
  userFileUrl: string;
  fileUrl: string;
  createdA: string;
}

export interface PostResponse {
  posts: Post[];
  page: number;
  pageSize: number;
  totalCount: number;
}
