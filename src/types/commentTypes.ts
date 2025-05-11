export interface Comment {
  id: string;
  postId: string | null;
  recipeId: string | null;
  text: string;
  userId: string;
  name: string;
  fileUrl: string;
  createAt: string;
}

export interface CommentForm {
  postId: string | null;
  recipeId: string | null;
  text: string;
  userId: string;
}
