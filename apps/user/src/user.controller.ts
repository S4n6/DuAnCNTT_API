import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UserDto } from './user.dto';
import { UserResponseDto } from './user.response';
import { ObjectId } from 'mongoose';

@Controller('/api/users/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'getAllUsers' })
  getAllUsers(): Promise<UserResponseDto> {
    return this.userService.getAllUsers();
  }

  @MessagePattern({ cmd: 'searchUsers' })
  searchUsers(data: {
    name: string;
    email: string;
    isActive: boolean;
    page: number;
    limit: number;
  }): Promise<UserResponseDto> {
    const { name, email, isActive, page, limit } = data;
    return this.userService.searchUsers(name, email, isActive, page, limit);
  }

  @MessagePattern({ cmd: 'getTokenDevicesByUserId' })
  getTokenDevicesByUserId(data: { userId: ObjectId }): Promise<object> {
    return this.userService.getTokenDevicesByUserId(data.userId);
  }

  @MessagePattern({ cmd: 'getUserByName' })
  getUserByName(data: { name: string }): Promise<UserResponseDto> {
    return this.userService.getUserByName(data.name);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(data: { email: string }): Promise<UserResponseDto> {
    console.log('get user by email:', data);
    return this.userService.getUserByEmail(data.email);
  }

  @MessagePattern({ cmd: 'getUserByPhoneNumber' })
  getUserByPhoneNumber(data: {
    phoneNumber: string;
  }): Promise<UserResponseDto> {
    return this.userService.getUserByPhoneNumber(data.phoneNumber);
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(data: { id: ObjectId; token: string }): Promise<UserResponseDto> {
    return this.userService.getUserById(data.id);
  }

  @MessagePattern({ cmd: 'createUserByEmail' })
  async createUserByEmail(data: UserDto): Promise<UserResponseDto> {
    console.log('create user by email:', data);
    const userCreated = await this.userService.createUserByEmail(data);
    return userCreated;
  }

  @MessagePattern({ cmd: 'createTokenDevice' })
  async createTokenDevice(data: {
    userId: ObjectId;
    tokenDevice: string;
  }): Promise<UserResponseDto> {
    const userCreated = await this.userService.createTokenDevice(
      data.userId,
      data.tokenDevice,
    );
    return userCreated;
  }

  @MessagePattern({ cmd: 'updateUser' })
  async updateUser(data: {
    user: UserDto;
    id: ObjectId;
  }): Promise<UserResponseDto> {
    const userUpdated = await this.userService.updateUser(data.user, data.id);
    return userUpdated;
  }

  @MessagePattern({ cmd: 'deleteUser' })
  async deleteUser(data: { id: ObjectId }): Promise<UserResponseDto> {
    const userDeleted = await this.userService.deleteUser(data.id);
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
}
