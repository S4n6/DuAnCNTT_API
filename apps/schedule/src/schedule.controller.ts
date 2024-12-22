import { Controller, Get, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { IScheduleResponse } from './schedule.response';

@Controller('api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/:eventId')
  async getSchedule(@Param() eventId: string): Promise<IScheduleResponse> {
    return this.scheduleService.getSchedule(eventId);
  }
}
