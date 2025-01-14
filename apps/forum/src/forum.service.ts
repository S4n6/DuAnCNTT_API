import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './post.schema';
import { CommentDocument } from './comment.schema';
import {
  CommentResponse,
  ICommentResponse,
  IPostResponse,
  PostResponse,
} from './forum.response';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async createPost(data: {
    title: string;
    content: string;
    authorId: string;
    avatar: string;
    fullName: string;
  }): Promise<IPostResponse> {
    const newPost = new this.postModel({
      title: data.title,
      content: data.content,
      authorId: data.authorId,
      createdAt: new Date(),
      avatar: data.avatar,
      fullName: data.fullName,
      isVerify: true,
    });
    const result = await newPost.save();
    return new PostResponse(true, 'Post created successfully', {
      posts: result,
      total: 1,
      page: 1,
    });
  }

  async createComment(
    postId: string,
    data: { content: string; authorId: string },
  ): Promise<ICommentResponse> {
    const newComment = new this.commentModel({
      content: data.content,
      authorId: data.authorId,
      createdAt: new Date(),
      postId,
    });
    const savedComment: CommentDocument = await newComment.save();

    return new CommentResponse(true, 'Comment created successfully', {
      comments: [savedComment],
      total: 1,
      page: 1,
    });
  }

  async getPosts(page: number = 1, limit: number = 10): Promise<IPostResponse> {
    const skip = (page - 1) * limit;
    const posts = await this.postModel.find().skip(skip).limit(limit).exec();
    const total = await this.postModel.countDocuments().exec();
    return new PostResponse(true, 'Posts fetched successfully', {
      posts,
      total,
      page,
    });
  }

  async getComments(
    postId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<ICommentResponse> {
    const skip = (page - 1) * limit;
    const post = await this.postModel
      .findById(postId)
      .populate({
        path: 'comments',
        options: {
          skip,
          limit,
        },
      })
      .exec();
    const total = post.comments.length;
    return new CommentResponse(true, 'Comments fetched successfully', {
      comments: post.comments,
      total,
      page,
    });
  }
}
