import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/api/forum/')
export class ForumController {
  constructor(
    @Inject('FORUM_SERVICE') private readonly forumServiceClient: ClientProxy,
  ) {}

  @Post('createPost')
  async createPost(@Body() data: { title: string; content: string; authorId: string; avatar: string; fullName: string }) {
    return this.forumServiceClient
      .send({ cmd: 'createPost' }, data)
      .toPromise();
  }

  @Post('verifyPost')
  async verifyPost(@Body() data: { postId: string; isVerify: boolean }) {
    return this.forumServiceClient
      .send({ cmd: 'verifyPost' }, data)
      .toPromise();
  }

  @Post('createReply')
  async createReply(@Body() data: { commentId: string; content: string; authorId: string }) {
    return this.forumServiceClient
      .send({ cmd: 'createReply' }, data)
      .toPromise();
  }

  @Post('createComment')
  async createComment(@Body() data: { postId: string; content: string; authorId: string }) {
    return this.forumServiceClient
      .send({ cmd: 'createComment' }, data)
      .toPromise();
  }

  @Get('getPosts')
  async getPosts(@Query() data: { page: number; limit: number }) {
    return this.forumServiceClient
      .send({ cmd: 'getPosts' }, data)
      .toPromise();
  }

  @Get('search')
  async search(@Query() data: { page: number; limit: number; title: string }) {
    return this.forumServiceClient
      .send({ cmd: 'search' }, data)
      .toPromise();
  }

  @Get('getComments')
  async getComments(@Query() data: { postId: string }) {
    return this.forumServiceClient
      .send({ cmd: 'getComments' }, data)
      .toPromise();
  }
}