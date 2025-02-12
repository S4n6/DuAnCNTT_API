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
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UserDto } from './user.dto';
import { UserResponseDto } from './user.response';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';
import { Public } from 'lib/common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('/api/users/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  getAllUsers(): Promise<UserResponseDto> {
    return this.userService.getAllUsers();
  }

  @Get('search')
  searchUsers(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('isActive') isActive: boolean,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<UserResponseDto> {
    return this.userService.searchUsers(name, email, isActive, page, limit);
  }

  @Get('tokenDevice/:userId')
  getTokenDevicesByUserId(@Param('userId') userId: ObjectId): Promise<object> {
    return this.userService.getTokenDevicesByUserId(userId);
  }

  @Get('name/:name')
  getUserByName(@Param('name') name: string): Promise<UserResponseDto> {
    return this.userService.getUserByName(name);
  }

  @Get('email/:email')
  getUserByEmail(
    @Param() payload: { email: string },
  ): Promise<UserResponseDto> {
    console.log('get user by email:', payload);
    return this.userService.getUserByEmail(payload.email);
  }

  @Get('phoneNumber')
  getUserByPhoneNumber(phoneNumber: string): Promise<UserResponseDto> {
    return this.userService.getUserByPhoneNumber(phoneNumber);
  }

  @Get(':id')
  getUserById(
    @Param('id') id: ObjectId,
    @Query('token') token: string,
  ): Promise<UserResponseDto> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUserByEmail(@Body() user: UserDto): Promise<UserResponseDto> {
    console.log('create user by email:', user);
    const userCreated = await this.userService.createUserByEmail(user);
    return userCreated;
  }

  @Post('tokenDevice')
  async createTokenDevice(
    @Body() payload: { userId: ObjectId; tokenDevice: string },
  ): Promise<UserResponseDto> {
    const userCreated = await this.userService.createTokenDevice(
      payload.userId,
      payload.tokenDevice,
    );
    return userCreated;
  }

  @Put(':id')
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

  @Public()
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
