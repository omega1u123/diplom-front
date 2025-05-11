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
  fileUrl: string | null;
  createdA: string;
}
