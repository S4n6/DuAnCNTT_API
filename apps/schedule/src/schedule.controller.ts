import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { IScheduleResponse } from './schedule.response';
import { ScheduleRequest } from './schedule.request';

@Controller('api/schedule/')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(':eventId')
  async getSchedule(
    @Param() payload: { eventId: string },
  ): Promise<IScheduleResponse> {
    console.log('eventId::', payload.eventId);
    return this.scheduleService.getSchedules(payload.eventId);
  }

  @Post()
  async createSchedule(
    @Body() schedule: ScheduleRequest,
  ): Promise<IScheduleResponse> {
    console.log('schedule::', schedule);
    return this.scheduleService.createSchedule(schedule);
  }

  @Put('')
  async updateSchedule(
    @Body() schedule: ScheduleRequest,
  ): Promise<IScheduleResponse> {
    return this.scheduleService.updateSchedule(schedule);
  }

  @Delete(':scheduleIds')
  async deleteSchedule(
    @Param('scheduleIds') scheduleIds: string,
  ): Promise<IScheduleResponse> {
    const scheduleIdsArray = scheduleIds.split(',');
    return this.scheduleService.deleteSchedule(scheduleIdsArray);
  }
}
