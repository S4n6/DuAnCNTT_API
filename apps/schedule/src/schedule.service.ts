import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from './schedule.schema';
import { IScheduleResponse, ScheduleResponse } from './schedule.response';
import { ScheduleRequest } from './schedule.request';

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

  async createSchedule(schedule: ScheduleRequest): Promise<IScheduleResponse> {
    try {
      const newSchedule = new this.scheduleModel(schedule);
      await newSchedule.save();
      return new ScheduleResponse(true, 'Schedule created', newSchedule);
    } catch (e) {
      return new ScheduleResponse(false, e.message, null);
    }
  }

  async updateSchedule(schedule: ScheduleRequest): Promise<IScheduleResponse> {
    try {
      await this.scheduleModel.updateOne(
        { eventId: schedule.eventId },
        schedule,
      );
      return new ScheduleResponse(true, 'Schedule updated');
    } catch (e) {
      return new ScheduleResponse(false, e.message);
    }
  }

  async deleteSchedule(eventId: string): Promise<IScheduleResponse> {
    try {
      await this.scheduleModel.deleteOne({ eventId });
      return new ScheduleResponse(true, 'Schedule deleted');
    } catch (e) {
      return new ScheduleResponse(false, e.message);
    }
  }
}
