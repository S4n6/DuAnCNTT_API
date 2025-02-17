import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/participants/')
export class ParticipantsController {
  constructor(
    @Inject('PARTICIPANTS_SERVICE')
    private readonly participantsServiceClient: ClientProxy,
  ) {}

  @Post()
  async create(
    @Body() participant: { name: string; eventId: string; userId: string },
  ) {
    return this.participantsServiceClient
      .send({ cmd: 'create' }, participant)
      .toPromise();
  }

  @Get()
  async findAll() {
    return this.participantsServiceClient
      .send({ cmd: 'findAll' }, {})
      .toPromise();
  }

  @Get('event/:eventId')
  async findAllByEventId(@Param('eventId') eventId: string) {
    return this.participantsServiceClient
      .send({ cmd: 'findAllByEventId' }, { eventId })
      .toPromise();
  }

  @Get('userId/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    return this.participantsServiceClient
      .send({ cmd: 'findAllByUserId' }, { userId })
      .toPromise();
  }

  @Get('search')
  async searchByEventName(
    @Query()
    data: {
      eventName: string;
      userId: string;
      page: number;
      limit: number;
    },
  ) {
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

  @Put('reject')
  async reject(@Body() payload: { userId: string; eventId: string }) {
    return this.participantsServiceClient
      .send({ cmd: 'reject' }, payload)
      .toPromise();
  }

  @Put('accept')
  async accept(@Body() payload: { userId: string; eventId: string }) {
    return this.participantsServiceClient
      .send({ cmd: 'accept' }, payload)
      .toPromise();
  }

  @Put('cancel')
  async cancel(@Body() payload: { userId: string; eventId: string }) {
    return this.participantsServiceClient
      .send({ cmd: 'cancel' }, payload)
      .toPromise();
  }

  @Post('update')
  async update(
    @Body()
    data: {
      id: string;
      participant: { name: string; eventId: string; userId: string };
    },
  ) {
    return this.participantsServiceClient
      .send({ cmd: 'update' }, data)
      .toPromise();
  }

  @Delete()
  async removeByEventIdAndUserId(
    @Body() data: { eventId: string; userId: string },
  ) {
    return this.participantsServiceClient
      .send({ cmd: 'removeByEventIdAndUserId' }, data)
      .toPromise();
  }
}
