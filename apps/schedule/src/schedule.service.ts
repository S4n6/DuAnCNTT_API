import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from './schedule.schema';
import { IScheduleResponse, ScheduleResponse } from './schedule.response';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule') private readonly scheduleModel: Model<Schedule>,
  ) {}

  async getSchedule(eventId: string): Promise<IScheduleResponse> {
    try {
      const schedule = await this.scheduleModel.findOne({ eventId });
      return new ScheduleResponse(true, 'Schedule found', schedule);
    } catch (e) {
      return new ScheduleResponse(false, e.message, null);
    }
  }
}
