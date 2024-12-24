export interface Post {
  id?: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  comments?: { [key: string]: Comment };
}

export interface Comment {
  id?: string;
  content: string;
  author: string;
  createdAt: number;
  replies?: { [key: string]: Comment };
}

