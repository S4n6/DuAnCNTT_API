import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ForumService } from './forum.service';
import { IPostResponse } from './forum.response';
import { ForumGateway } from './forum.gateway';

@Controller()
export class ForumController {
  constructor(
    private readonly forumService: ForumService,
    private readonly forumGateway: ForumGateway,
  ) {}

  @MessagePattern({ cmd: 'createPost' })
  async createPost(
    @Payload()
    data: {
      title: string;
      content: string;
      authorId: string;
      avatar: string;
      fullName: string;
    },
  ): Promise<IPostResponse> {
    const { title, content, authorId, avatar, fullName } = data;
    const response = await this.forumService.createPost({
      title,
      content,
      authorId,
      avatar,
      fullName,
    });
    return response;
  }

  @MessagePattern({ cmd: 'verifyPost' })
  async verifyPost(
    @Payload() data: { postId: string; isVerify: boolean },
  ): Promise<any> {
    const { postId, isVerify } = data;
    return this.forumService.verifyPost(postId, isVerify);
  }

  @MessagePattern({ cmd: 'createReply' })
  async createReply(
    @Payload() data: { commentId: string; content: string; authorId: string },
  ): Promise<any> {
    const { commentId, content, authorId } = data;
    console.log('reply', commentId, content, authorId);
    return this.forumService.addReply(commentId, { content, authorId });
  }

  @MessagePattern({ cmd: 'createComment' })
  async createComment(
    @Payload() data: { postId: string; content: string; authorId: string },
  ): Promise<any> {
    const { postId, content, authorId } = data;
    const response = await this.forumService.createComment(postId, {
      content,
      authorId,
    });
    if (response.success) {
      const comments = await this.forumService.getComments(data.postId, 1, 10);
      this.forumGateway.server.emit('commentsFetched', comments);
    }
    return response;
  }

  @MessagePattern({ cmd: 'getPosts' })
  async getPosts(
    @Payload() data: { page: number; limit: number },
  ): Promise<IPostResponse> {
    const { page, limit } = data;
    return this.forumService.getPosts(page, limit);
  }

  @MessagePattern({ cmd: 'search' })
  async search(
    @Payload()
    data: {
      page: number;
      date: Date;
      limit: number;
      title: { title: string };
    },
  ): Promise<IPostResponse> {
    const { page, limit, title, date } = data;
    return this.forumService.search(page, limit, title.title, date);
  }

  @MessagePattern({ cmd: 'getComments' })
  async getComments(@Payload() data: { postId: string }): Promise<any> {
    const { postId } = data;
    return this.forumService.getComments(postId, 1, 10);
  }
}
