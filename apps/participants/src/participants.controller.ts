import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { Participant } from './schema/participant.schema';
import { ParticipantResponse } from './dto/participant.response';

@Controller('/api/participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  async create(@Body() participant: Participant): Promise<ParticipantResponse> {
    return this.participantsService.create(participant);
  }

  @Get()
  async findAll(): Promise<ParticipantResponse> {
    return this.participantsService.findAll();
  }

  @Get('eventId/:eventId')
  async findAllByEventId(@Param('eventId') eventId: string): Promise<object> {
    return this.participantsService.findAllByEventId(eventId);
  }

  @Get('userId/:userId')
  async findAllByUserId(
    @Param('userId') userId: string,
  ): Promise<ParticipantResponse> {
    return this.participantsService.findAllByUserId(userId);
  }

  @Get('search')
  async searchByEventName(
    @Query('eventName') eventName: string,
    @Query('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ParticipantResponse> {
    return this.participantsService.search(eventName, userId, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ParticipantResponse> {
    return this.participantsService.findOne(id);
  }

  @Put('reject')
  async reject(
    @Body() payload: { userId: string; eventId: string },
  ): Promise<ParticipantResponse> {
    return this.participantsService.reject(payload);
  }

  @Put('accept')
  async accept(
    @Body() payload: { userId: string; eventId: string },
  ): Promise<ParticipantResponse> {
    console.log('accept', payload);
    return this.participantsService.accept(payload);
  }

  @Put('cancel')
  async cancel(
    @Body() payload: { userId: string; eventId: string },
  ): Promise<ParticipantResponse> {
    console.log('cancel', payload);
    return this.participantsService.cancel(payload);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() participant: Participant,
  ): Promise<ParticipantResponse> {
    return this.participantsService.update(id, participant);
  }

  @Delete('eventId/:eventId/userId/:userId')
  async removeByEventIdAndUserId(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
  ): Promise<ParticipantResponse> {
    return this.participantsService.removeByEventIdAndUserId(eventId, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ParticipantResponse> {
    return this.participantsService.remove(id);
  }
}
