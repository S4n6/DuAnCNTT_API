import { IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export interface IScheduleRequest {
  eventId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  // resources: string;
}

export class ScheduleRequest implements IScheduleRequest {

  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  startTime: Date;

  @IsNotEmpty()
  endTime: Date;
}
