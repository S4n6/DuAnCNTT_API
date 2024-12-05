import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { NotificationDto } from './notification.dto';

export class NotificationRequestCreate {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @Transform(({ value }) => value ?? new Date())
  createAt: Date;

  @IsBoolean()
  @Transform(({ value }) => value ?? false)
  read: boolean;
}

export class NotificationRequestSend {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsObject()
  notification: NotificationDto;
}
