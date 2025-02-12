import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
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

  @Post('post/verify/:id')
  async verifyPost(
    @Param('id') postId: string,
    @Body('isVerify') isVerify: boolean = true,
  ): Promise<any> {
    return this.forumService.verifyPost(postId, isVerify);
  }

  @Post('reply/:id')
  async createReply(
    @Param('id') commentId: string,
    @Body('content') content: string,
    @Body('authorId') authorId: string,
  ): Promise<any> {
    console.log('reply', commentId, content, authorId);
    return this.forumService.addReply(commentId, { content, authorId });
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
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<IPostResponse> {
    return this.forumService.getPosts(page, limit);
  }

  @Get('search')
  async search(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('title') title: string,
  ): Promise<IPostResponse> {
    return this.forumService.search(page, limit, title);
  }

  @Get('post/:id/comments')
  async getComments(@Param('id') postId: string): Promise<any> {
    return this.forumService.getComments(postId, 1, 10);
  }
}
