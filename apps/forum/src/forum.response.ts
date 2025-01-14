import { CommentDocument } from './comment.schema';
import { PostDocument } from './post.schema';

export interface IPostResponse {
  success: boolean;
  message: string;
  data: {
    posts: PostDocument | PostDocument[];
    total: number;
    page: number;
  };
}

export interface ICommentResponse {
  success: boolean;
  message: string;
  data: {
    comments: CommentDocument | CommentDocument[];
    total: number;
    page: number;
  };
}

export class PostResponse implements IPostResponse {
  success: boolean;
  message: string;
  data: {
    posts: PostDocument | PostDocument[];
    total: number;
    page: number;
  };

  constructor(
    success: boolean,
    message: string,
    data: { posts: PostDocument | PostDocument[]; total: number; page: number },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export class CommentResponse implements ICommentResponse {
  success: boolean;
  message: string;
  data: {
    comments: CommentDocument | CommentDocument[];
    total: number;
    page: number;
  };

  constructor(
    success: boolean,
    message: string,
    data: {
      comments: CommentDocument | CommentDocument[];
      total: number;
      page: number;
    },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
