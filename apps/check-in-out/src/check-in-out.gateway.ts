import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CheckInOutService } from './check-in-out.service';

@WebSocketGateway({ namespace: '/check-in-out', cors: { origin: '*' } })
export class CheckInOutGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly checkInOutService: CheckInOutService) {}

  @SubscribeMessage('getParticipantsCount')
  async handleGetParticipantsCount(
    @MessageBody() eventId: string,
  ): Promise<void> {
    const count = await this.checkInOutService.getParticipantsCount(eventId);
    this.server.emit('participantsCount', count);
  }

  async updateParticipantsCount(eventId: string): Promise<void> {
    const count = await this.checkInOutService.getParticipantsCount(eventId);
    this.server.emit('participantsCount', { eventId, count });
  }
}
