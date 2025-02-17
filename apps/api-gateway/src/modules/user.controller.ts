import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from 'apps/user/src/user.dto';
import { UserResponseDto } from 'apps/user/src/user.response';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';
import { ObjectId } from 'mongoose';

@UseGuards(JwtAuthGuard)
@Controller('/api/users/')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get()
  async getAllUsers(): Promise<UserResponseDto> {
    console.log('getAllUsers');
    return this.userServiceClient.send({ cmd: 'getAllUsers' }, {}).toPromise();
  }

  @Get('search')
  async searchUsers(
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('isActive') isActive: boolean,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'searchUsers' }, { name, email, isActive, page, limit })
      .toPromise();
  }

  @Get('token-devices/:userId')
  async getTokenDevicesByUserId(
    @Param('userId') userId: ObjectId,
  ): Promise<object> {
    return this.userServiceClient
      .send({ cmd: 'getTokenDevicesByUserId' }, { userId })
      .toPromise();
  }

  @Get('name/:name')
  async getUserByName(@Param('name') name: string): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'getUserByName' }, { name })
      .toPromise();
  }

  @Put('role/:id')
  async updateUserRole(
    @Param('id') id: ObjectId,
    @Body() body: { role: string },
  ): Promise<UserResponseDto> {
    console.log('updateUserRole', id, body.role);
    return this.userServiceClient
      .send({ cmd: 'updateUserRole' }, { role: body.role, id })
      .toPromise();
  }

  @Get('email/:email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'getUserByEmail' }, { email })
      .toPromise();
  }

  @Get('phone/:phoneNumber')
  async getUserByPhoneNumber(
    @Param('phoneNumber') phoneNumber: string,
  ): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'getUserByPhoneNumber' }, { phoneNumber })
      .toPromise();
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: ObjectId,
    @Query('token') token: string,
  ): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'getUserById' }, { id, token })
      .toPromise();
  }

  @Post()
  async createUserByEmail(@Body() data: UserDto): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'createUserByEmail' }, data)
      .toPromise();
  }

  @Post('token-device')
  async createTokenDevice(
    @Body() data: { userId: ObjectId; tokenDevice: string },
  ): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'createTokenDevice' }, data)
      .toPromise();
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: ObjectId,
    @Body() user: UserDto,
  ): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'updateUser' }, { user, id })
      .toPromise();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: ObjectId): Promise<UserResponseDto> {
    return this.userServiceClient
      .send({ cmd: 'deleteUser' }, { id })
      .toPromise();
  }
}
