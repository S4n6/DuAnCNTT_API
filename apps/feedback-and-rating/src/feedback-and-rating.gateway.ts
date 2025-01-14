import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FeedbackAndRatingService } from './feedback-and-rating.service';

@WebSocketGateway({ namespace: '/rating', cors: { origin: '*' } })
export class FeedbackAndRatingGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly feedbackAndRatingService: FeedbackAndRatingService,
  ) {}

  @SubscribeMessage('getRatingByEventId')
  async handleGetRatingByEventId(
    @MessageBody() payload: { eventId: string; page?: number; limit?: number },
  ): Promise<void> {
    console.log('getRatingByEventId', payload.eventId);
    const rating =
      await this.feedbackAndRatingService.getRatingByEventId(payload.eventId, payload.page ?? 1, payload.limit ?? 10);
    this.server.emit('ratingUpdate', rating);
  }
}
