// src/user/user.response.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { User } from './user.schema';

export class UserResponseType {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber(null)
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsOptional()
  avatar?: string;
}

export class UserResponseDto {
  success: boolean;
  message: string;
  data?: User | User[];

  constructor(success: boolean, message: string, data?: User | User[]) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
