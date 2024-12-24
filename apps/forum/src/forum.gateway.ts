import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ForumService } from './forum.service';
import { Comment } from './forum.schema';

@WebSocketGateway({ namespace: '/forum', cors: { origin: '*' } })
export class ForumGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly forumService: ForumService) {}

  @SubscribeMessage('addComment')
  async handleAddComment(
    @MessageBody() data: { postId: string; content: string; author: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { postId, content, author } = data;
    const comment: Comment = {
      content,
      author,
      createdAt: Date.now(),
    };
    const commentId = await this.forumService.addComment(postId, comment);
    const commentPayload: Comment = {
      id: commentId,
      content,
      author,
      createdAt: Date.now(),
    };
    this.server.to(postId).emit('newComment', commentPayload);
  }

  @SubscribeMessage('addReply')
  async handleAddReply(
    @MessageBody()
    data: {
      postId: string;
      commentId: string;
      content: string;
      author: string;
    },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const { postId, commentId, content, author } = data;
    const replyId = await this.forumService.addReply(postId, commentId, {
      content,
      author,
    });
    const reply: Comment = {
      id: replyId,
      content,
      author,
      createdAt: Date.now(),
    };
    this.server.to(postId).emit('newReply', { commentId, reply });
  }

  @SubscribeMessage('joinPost')
  handleJoinPost(
    @MessageBody() postId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(postId);
  }

  @SubscribeMessage('leavePost')
  handleLeavePost(
    @MessageBody() postId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(postId);
  }
}
