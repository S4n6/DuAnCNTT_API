import admin from './firebaseAdmin.config';
import { IsString, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class NotificationDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsDate()
  createAt: Date;

  @IsBoolean()
  read: boolean;
}
