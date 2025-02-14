import {
  Controller,
  Body,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ParticipantsService } from './participants.service';
import { Participant } from './schema/participant.schema';
import { ParticipantResponse } from './dto/participant.response';

@Controller()
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @MessagePattern({ cmd: 'create' })
  async create(participant: Participant): Promise<ParticipantResponse> {
    return this.participantsService.create(participant);
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll(): Promise<ParticipantResponse> {
    return this.participantsService.findAll();
  }

  @MessagePattern({ cmd: 'findAllByEventId' })
  async findAllByEventId(eventId: string): Promise<object> {
    return this.participantsService.findAllByEventId(eventId);
  }

  @MessagePattern({ cmd: 'findAllByUserId' })
  async findAllByUserId(userId: string): Promise<ParticipantResponse> {
    return this.participantsService.findAllByUserId(userId);
  }

  @MessagePattern({ cmd: 'searchByEventName' })
  async searchByEventName(data: { eventName: string, userId: string, page: number, limit: number }): Promise<ParticipantResponse> {
    const { eventName, userId, page, limit } = data;
    return this.participantsService.search(eventName, userId, page, limit);
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(id: string): Promise<ParticipantResponse> {
    return this.participantsService.findOne(id);
  }

  @MessagePattern({ cmd: 'reject' })
  async reject(payload: { userId: string; eventId: string }): Promise<ParticipantResponse> {
    return this.participantsService.reject(payload);
  }

  @MessagePattern({ cmd: 'accept' })
  async accept(payload: { userId: string; eventId: string }): Promise<ParticipantResponse> {
    console.log('accept', payload);
    return this.participantsService.accept(payload);
  }

  @MessagePattern({ cmd: 'cancel' })
  async cancel(payload: { userId: string; eventId: string }): Promise<ParticipantResponse> {
    console.log('cancel', payload);
    return this.participantsService.cancel(payload);
  }

  @MessagePattern({ cmd: 'update' })
  async update(data: { id: string, participant: Participant }): Promise<ParticipantResponse> {
    const { id, participant } = data;
    return this.participantsService.update(id, participant);
  }

  @MessagePattern({ cmd: 'removeByEventIdAndUserId' })
  async removeByEventIdAndUserId(data: { eventId: string, userId: string }): Promise<ParticipantResponse> {
    const { eventId, userId } = data;
    return this.participantsService.removeByEventIdAndUserId(eventId, userId);
  }

  @MessagePattern({ cmd: 'remove' })
  async remove(id: string): Promise<ParticipantResponse> {
    return this.participantsService.remove(id);
  }
}
