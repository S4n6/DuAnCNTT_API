export interface Post {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: number;
  comments?: { [key: string]: Comment };
  isVerify?: boolean;
}

export interface Comment {
  id?: string;
  content: string;
  authorId: string;
  createdAt: number;
  replies?: { [key: string]: Comment };
}
