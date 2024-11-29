import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UserDto } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'getUserById')
  getUserById(
    data: { userId: string },
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): object {
    return this.userService.getUserById(data.userId);
  }

  @GrpcMethod('UserService', 'createUserByEmail')
  createUserByEmail(
    data: { user: UserDto },
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): object {
    return this.userService.createUserByEmail(data.user);
  }
}
