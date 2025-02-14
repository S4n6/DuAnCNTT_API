import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ScheduleRequest } from 'apps/schedule/src/schedule.request';
import { IScheduleResponse } from 'apps/schedule/src/schedule.response';

@Controller('/api/schedule/')
export class ScheduleController {
  constructor(
    @Inject('SCHEDULE_SERVICE')
    private readonly scheduleServiceClient: ClientProxy,
  ) {}

  @Get()
  async getSchedule(
    @Query('eventId') eventId: string,
  ): Promise<IScheduleResponse> {
    return this.scheduleServiceClient
      .send({ cmd: 'getSchedule' }, { eventId })
      .toPromise();
  }

  @Post()
  async createSchedule(
    @Body() schedule: ScheduleRequest,
  ): Promise<IScheduleResponse> {
    return this.scheduleServiceClient
      .send({ cmd: 'createSchedule' }, schedule)
      .toPromise();
  }

  @Put()
  async updateSchedule(
    @Body() schedule: ScheduleRequest,
  ): Promise<IScheduleResponse> {
    return this.scheduleServiceClient
      .send({ cmd: 'updateSchedule' }, schedule)
      .toPromise();
  }

  @Delete()
  async deleteSchedule(
    @Query('scheduleIds') scheduleIds: string,
  ): Promise<IScheduleResponse> {
    return this.scheduleServiceClient
      .send({ cmd: 'deleteSchedule' }, scheduleIds)
      .toPromise();
  }
}
