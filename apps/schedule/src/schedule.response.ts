import { Schedule } from './schedule.schema';

export interface IScheduleResponse {
  success: boolean;
  message: string;
  data?: Schedule | Schedule[];
}

export class ScheduleResponse implements IScheduleResponse {
  success: boolean;
  message: string;
  data?: Schedule | Schedule[];

  constructor(success: boolean, message: string, data?: Schedule | Schedule[]) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
