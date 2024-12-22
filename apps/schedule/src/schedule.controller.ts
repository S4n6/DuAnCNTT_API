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

@Controller('api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/:eventId')
  async getSchedule(@Param() eventId: string): Promise<IScheduleResponse> {
    return this.scheduleService.getSchedule(eventId);
  }

  @Post()
  async createSchedule(
    @Body() schedule: ScheduleRequest,
  ): Promise<IScheduleResponse> {
    return this.scheduleService.createSchedule(schedule);
  }

  @Put('')
  async updateSchedule(
    @Body() schedule: ScheduleRequest,
  ): Promise<IScheduleResponse> {
    return this.scheduleService.updateSchedule(schedule);
  }

  @Delete('/:eventId')
  async deleteSchedule(
    @Param('eventId') eventId: string,
  ): Promise<IScheduleResponse> {
    return this.scheduleService.deleteSchedule(eventId);
  }
}
