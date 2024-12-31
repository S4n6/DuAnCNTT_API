// src/user/user.dto.ts
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('VN')
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => value?.trim() || 'user')
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
