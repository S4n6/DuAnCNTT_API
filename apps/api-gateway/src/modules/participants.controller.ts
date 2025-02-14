import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/api/participants/')
export class ParticipantsController {
  constructor(
    @Inject('PARTICIPANTS_SERVICE') private readonly participantsServiceClient: ClientProxy,
  ) {}

  @Post('create')
  async create(@Body() participant: { name: string; eventId: string; userId: string }) {
    return this.participantsServiceClient
      .send({ cmd: 'create' }, participant)
      .toPromise();
  }

  @Get('all')
  async findAll() {
    return this.participantsServiceClient
      .send({ cmd: 'findAll' }, {})
      .toPromise();
  }

  @Get('by-event')
  async findAllByEventId(@Query('eventId') eventId: string) {
    return this.participantsServiceClient
      .send({ cmd: 'findAllByEventId' }, { eventId })
      .toPromise();
  }

  @Get('by-user')
  async findAllByUserId(@Query('userId') userId: string) {
    return this.participantsServiceClient
      .send({ cmd: 'findAllByUserId' }, { userId })
      .toPromise();
  }

  @Get('search')
  async searchByEventName(@Query() data: { eventName: string; userId: string; page: number; limit: number }) {
    return this.participantsServiceClient
      .send({ cmd: 'searchByEventName' }, data)
      .toPromise();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.participantsServiceClient
      .send({ cmd: 'findOne' }, { id })
      .toPromise();
  }

  @Post('reject')
  async reject(@Body() payload: { userId: string; eventId: string }) {
    return this.participantsServiceClient
      .send({ cmd: 'reject' }, payload)
      .toPromise();
  }

  @Post('accept')
  async accept(@Body() payload: { userId: string; eventId: string }) {
    return this.participantsServiceClient
      .send({ cmd: 'accept' }, payload)
      .toPromise();
  }

  @Post('cancel')
  async cancel(@Body() payload: { userId: string; eventId: string }) {
    return this.participantsServiceClient
      .send({ cmd: 'cancel' }, payload)
      .toPromise();
  }

  @Post('update')
  async update(@Body() data: { id: string; participant: { name: string; eventId: string; userId: string } }) {
    return this.participantsServiceClient
      .send({ cmd: 'update' }, data)
      .toPromise();
  }

  @Delete('remove-by-event-and-user')
  async removeByEventIdAndUserId(@Body() data: { eventId: string; userId: string }) {
    return this.participantsServiceClient
      .send({ cmd: 'removeByEventIdAndUserId' }, data)
      .toPromise();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.participantsServiceClient
      .send({ cmd: 'remove' }, { id })
      .toPromise();
  }
}