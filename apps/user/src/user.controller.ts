import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import { UserResponseDto } from './user.response';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(id: string): Promise<UserResponseDto> {
    return this.userService.getUserById(id);
  }

  @Post('createUserByEmail')
  async createUserByEmail(@Body() user: UserDto): Promise<UserResponseDto> {
    console.log('user', user);
    const userCreated = await this.userService.createUserByEmail(user);
    return userCreated;
  }

  @GrpcMethod('UserService', 'ValidateUserByEmail')
  async validateUserByEmail(
    data: { email: string; password: string },
    metadata: Metadata,
    call: ServerUnaryCall<UserDto>,
  ): Promise<User> {
    const user = { username: data.email, password: data.password };
    return this.userService.validateUserByEmail(user);
  }

  @GrpcMethod('UserService', 'ValidateUserByPhoneNumber')
  async validateUserByPhoneNumber(
    data: { phoneNumber: string; password: string },
    metadata: Metadata,
    call: ServerUnaryCall<UserDto>,
  ): Promise<User> {
    const user = { username: data.phoneNumber, password: data.password };
    return this.userService.validateUserByPhoneNumber(user);
  }
}
