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

  constructor(data: IScheduleResponse) {
    this.success = data.success;
    this.message = data.message;
    this.data = data.data;
  }
}
