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

  async getSchedules(eventId: string): Promise<IScheduleResponse> {
    try {
      const schedules = await this.scheduleModel.find({ eventId });
      return new ScheduleResponse(true, 'Schedule found', schedules);
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

  async deleteSchedule(ids: string[]): Promise<IScheduleResponse> {
    try {
      await this.scheduleModel.deleteMany({ _id: { $in: ids } });
      return new ScheduleResponse(true, 'Schedule deleted', null);
    } catch (e) {
      return new ScheduleResponse(false, e.message);
    }
  }
}
