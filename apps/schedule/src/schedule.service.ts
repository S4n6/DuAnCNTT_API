import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from './schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule') private readonly scheduleModel: Model<Schedule>,
  ) {}

  async getSchedule(eventId: string) {
    try{

        const schedule = await this.scheduleModel.findOne({ eventId });
        return schedule;

    }catch(e){
        console.log(e)
        }
  }
}
