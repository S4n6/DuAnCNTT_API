import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ScheduleService } from './schedule.service';
import { IScheduleResponse } from './schedule.response';
import { ScheduleRequest } from './schedule.request';

@Controller('api/schedule/')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @MessagePattern({ cmd: 'getSchedule' })
  async getSchedule(
    payload: { eventId: string },
  ): Promise<IScheduleResponse> {
    console.log('eventId::', payload.eventId);
    return this.scheduleService.getSchedules(payload.eventId);
  }

  @MessagePattern({ cmd: 'createSchedule' })
  async createSchedule(
    schedule: ScheduleRequest,
  ): Promise<IScheduleResponse> {
    console.log('schedule::', schedule);
    return this.scheduleService.createSchedule(schedule);
  }

  @MessagePattern({ cmd: 'updateSchedule' })
  async updateSchedule(
    schedule: ScheduleRequest,
  ): Promise<IScheduleResponse> {
    return this.scheduleService.updateSchedule(schedule);
  }

  @MessagePattern({ cmd: 'deleteSchedule' })
  async deleteSchedule(
    scheduleIds: string,
  ): Promise<IScheduleResponse> {
    const scheduleIdsArray = scheduleIds.split(',');
    return this.scheduleService.deleteSchedule(scheduleIdsArray);
  }
}
