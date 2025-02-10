import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ForumService } from './forum.service';

@WebSocketGateway({ namespace: '/forum', cors: { origin: '*' } })
export class ForumGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly forumService: ForumService) {}

  @SubscribeMessage('getPosts')
  async handleGetPosts(
    @MessageBody() data: { page: number; limit: number },
  ): Promise<void> {
    const posts = await this.forumService.getPosts(data.page, data.limit);
    this.server.emit('postsFetched', posts);
  }

  @SubscribeMessage('getCommentByPostId')
  async handleGetComments(
    @MessageBody() data: { postId: string; page: number; limit: number },
  ): Promise<void> {
    console.log(data);
    const comments = await this.forumService.getComments(
      data.postId,
      data.page,
      data.limit,
    );
    this.server.emit('commentsFetched', comments);
  }
}
