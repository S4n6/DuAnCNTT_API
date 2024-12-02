import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import { UserResponseDto } from './user.response';
import { ObjectId } from 'mongoose';

@Controller('/api/users/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<UserResponseDto> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(id: ObjectId): Promise<UserResponseDto> {
    return this.userService.getUserById(id);
  }

  @Get('getUserByEmail')
  getUserByEmail(email: string): Promise<UserResponseDto> {
    return this.userService.getUserByEmail(email);
  }

  @Get('getUserByPhoneNumber')
  getUserByPhoneNumber(phoneNumber: string): Promise<UserResponseDto> {
    return this.userService.getUserByPhoneNumber(phoneNumber);
  }

  @Post('createUserByEmail')
  async createUserByEmail(@Body() user: UserDto): Promise<UserResponseDto> {
    console.log('user', user);
    const userCreated = await this.userService.createUserByEmail(user);
    return userCreated;
  }

  @Post('createUserByPhoneNumber')
  async createUserByPhoneNumber(
    @Body() user: UserDto,
  ): Promise<UserResponseDto> {
    const userCreated = await this.userService.createUserByPhoneNumber(user);
    return userCreated;
  }

  @Patch(':id')
  async updateUser(
    @Body() user: UserDto,
    @Param('id') id: ObjectId,
  ): Promise<UserResponseDto> {
    const userUpdated = await this.userService.updateUser(user, id);
    return userUpdated;
  }

  @Delete(':id')
  async deleteUser(
    @Body() user: UserDto,
    @Param('id') id: ObjectId,
  ): Promise<UserResponseDto> {
    const userDeleted = await this.userService.deleteUser(id);
    return userDeleted;
  }

  @GrpcMethod('UserService', 'ValidateUserByEmail')
  async validateUserByEmail(
    data: { email: string; password: string },
    metadata: Metadata,
    call: ServerUnaryCall<UserDto, any>,
  ): Promise<UserResponseDto> {
    const user = { username: data.email, password: data.password };
    return this.userService.validateUserByEmail(user);
  }

  @GrpcMethod('UserService', 'ValidateUserByPhoneNumber')
  async validateUserByPhoneNumber(
    data: { phoneNumber: string; password: string },
    metadata: Metadata,
    call: ServerUnaryCall<UserDto, any>,
  ): Promise<UserResponseDto> {
    const user = { username: data.phoneNumber, password: data.password };
    return this.userService.validateUserByPhoneNumber(user);
  }
}
