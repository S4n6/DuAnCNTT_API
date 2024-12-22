import { Controller, Get, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/:eventId')
  getSchedule(@Param() eventId: string) {
    return this.scheduleService.getSchedule(eventId);
  }
}
