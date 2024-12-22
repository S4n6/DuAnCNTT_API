import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export interface IScheduleRequest {
  eventId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  resources: string;
}

export class ScheduleRequest implements IScheduleRequest {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @IsString()
  @IsNotEmpty()
  resources: string;

  constructor(data: IScheduleRequest) {
    this.eventId = data.eventId;
    this.title = data.title;
    this.description = data.description;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.resources = data.resources;
  }
}