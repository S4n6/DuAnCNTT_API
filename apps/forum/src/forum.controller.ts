import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ForumService } from './forum.service';
import { IPostResponse } from './forum.response';

@Controller('/api/forum/')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('post')
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('authorId') authorId: string,
    @Body('avatar') avatar: string,
    @Body('fullName') fullName: string,
  ): Promise<IPostResponse> {
    const response = await this.forumService.createPost({
      title,
      content,
      authorId,
      avatar,
      fullName,
    });
    return response;
  }

  @Post('post/:id/comment')
  async createComment(
    @Param('id') postId: string,
    @Body('content') content: string,
    @Body('authorId') authorId: string,
  ): Promise<any> {
    return this.forumService.createComment(postId, { content, authorId });
  }

  @Get('posts')
  async getPosts(
    @Param('page') page: number = 1,
    @Param('limit') limit: number = 10,
  ): Promise<IPostResponse> {
    return this.forumService.getPosts(page, limit);
  }

  @Get('post/:id/comments')
  async getComments(@Param('id') postId: string): Promise<any> {
    return this.forumService.getComments(postId, 1, 10);
  }
}
