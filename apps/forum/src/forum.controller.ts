import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('create')
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('author') author: string,
  ): Promise<{ id: string }> {
    const id = await this.forumService.createPost({ title, content, author });
    return { id };
  }

  @Get('posts')
  async getPosts(): Promise<any> {
    return this.forumService.getPosts();
  }

  @Get('post/:id/comments')
  async getComments(@Param('id') postId: string): Promise<any> {
    return this.forumService.getComments(postId);
  }
}
