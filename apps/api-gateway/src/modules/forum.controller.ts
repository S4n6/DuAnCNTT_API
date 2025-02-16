import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Inject,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';
import { title } from 'process';

// @UseGuards(JwtAuthGuard)
@Controller('/api/forum/')
export class ForumController {
  constructor(
    @Inject('FORUM_SERVICE') private readonly forumServiceClient: ClientProxy,
  ) {}

  @Post('post')
  async createPost(
    @Body()
    data: {
      title: string;
      content: string;
      authorId: string;
      avatar: string;
      fullName: string;
    },
  ) {
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

  @Post('reply/:commentId')
  async createReply(
    @Body() body: { content: string; authorId: string },
    @Param('commentId') commentId: string,
  ) {
    const data = { ...body, commentId };
    return this.forumServiceClient
      .send({ cmd: 'createReply' }, data)
      .toPromise();
  }

  @Post('post/:postId/comment')
  async createComment(
    @Body() body: { content: string; authorId: string },
    @Param('postId') postId: string,
  ) {
    const data = { ...body, postId };
    return this.forumServiceClient
      .send({ cmd: 'createComment' }, data)
      .toPromise();
  }

  @Get('posts')
  async getPosts(@Query() data: { page: number; limit: number }) {
    return this.forumServiceClient.send({ cmd: 'getPosts' }, data).toPromise();
  }

  @Get('search')
  async search(
    @Query() title?: string,
    @Query() date?: string,
    @Query() page: number = 1,
    @Query() limit: number = 10,
  ) {
    let parsedDate: Date | undefined = undefined;
    if (date) {
      try {
        parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          throw new Error('Invalid date format');
        }
      } catch (error) {
        console.error('Invalid date format:', error.message);
      }
    }

    return this.forumServiceClient
      .send({ cmd: 'search' }, { title, date: parsedDate, page, limit })
      .toPromise();
  }

  @Get('getComments')
  async getComments(@Query() data: { postId: string }) {
    return this.forumServiceClient
      .send({ cmd: 'getComments' }, data)
      .toPromise();
  }
}
