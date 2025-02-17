import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  Put,
  UseGuards,
  Param,
  ParseArrayPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ScheduleRequest } from 'apps/schedule/src/schedule.request';
import { IScheduleResponse } from 'apps/schedule/src/schedule.response';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/schedule/')
export class ScheduleController {
  constructor(
    @Inject('SCHEDULE_SERVICE')
    private readonly scheduleServiceClient: ClientProxy,
  ) {}

  @Get(':eventId')
  async getSchedulesByEventId(
    @Param('eventId') eventId: string,
  ): Promise<IScheduleResponse> {
    return this.scheduleServiceClient
      .send({ cmd: 'getSchedule' }, { eventId })
      .toPromise();
  }

  @Get('event/:eventId')
  async getSchedule(
    @Param('eventId') eventId: string,
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
    @Query('scheduleIds', new ParseArrayPipe()) scheduleIds: string[],
  ): Promise<IScheduleResponse> {
    try {
      const result = await this.scheduleServiceClient
        .send({ cmd: 'deleteSchedule' }, scheduleIds)
        .toPromise();

      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete schedules');
    }
  }
}
