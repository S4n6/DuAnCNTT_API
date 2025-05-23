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

  async verifyPost(postId: string, isVerify: boolean): Promise<IPostResponse> {
    const post = await this.postModel.findById(postId).exec();
    post.isVerify = isVerify;
    await post.save();
    return new PostResponse(true, 'Post verified successfully', {
      posts: [post],
      total: 1,
      page: 1,
    });
  }

  async getPosts(page: number = 1, limit: number = 10): Promise<IPostResponse> {
    const skip = (page - 1) * limit;
    const posts = await this.postModel
      .find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.postModel.countDocuments().exec();
    return new PostResponse(true, 'Posts fetched successfully', {
      posts,
      total,
      page,
    });
  }

  async search(
    page: number = 1,
    limit: number = 10,
    title: string,
    date?: Date,
  ): Promise<IPostResponse> {
    console.log('search', title, date);
    const skip = (page - 1) * limit;
    const query: any = { title: { $regex: title, $options: 'i' } };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    const posts = await this.postModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.postModel.countDocuments(query).exec();
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
    const comments = await this.commentModel
      .find({ postId })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'replies',
        populate: {
          path: 'replies',
          model: 'Comment',
        },
      })
      .exec();
    const total = await this.commentModel.countDocuments({ postId }).exec();
    return new CommentResponse(true, 'Comments fetched successfully', {
      comments,
      total,
      page,
    });
  }

  async addReply(
    commentId: string,
    data: { content: string; authorId: string },
  ): Promise<ICommentResponse> {
    const newReply = new this.commentModel({
      content: data.content,
      authorId: data.authorId,
      createdAt: new Date(),
      postId: null, // Replies do not need a postId
    });
    const savedReply: any = (await newReply.save()) as any;
    const comment = await this.commentModel.findById(commentId).exec();
    comment.replies.push(savedReply._id);
    await comment.save();

    return new CommentResponse(true, 'Reply added successfully', {
      comments: [savedReply],
      total: 1,
      page: 1,
    });
  }
}
