import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginRequestDto } from 'apps/auth/src/auth.request';
import { AuthResponseDto } from 'apps/auth/src/auth.response';
import { UserDto } from 'apps/user/src/user.dto';

@Controller('/api/auth/')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  @Post('login')
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authServiceClient
      .send({ cmd: 'auth.login' }, loginRequestDto)
      .toPromise();
  }

  @Post('loginGgwithToken')
  async verifyToken(@Body() body: { token: string }): Promise<AuthResponseDto> {
    return this.authServiceClient
      .send({ cmd: 'auth.loginGgwithToken' }, body)
      .toPromise();
  }

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<AuthResponseDto> {
    return this.authServiceClient
      .send({ cmd: 'auth.register' }, userDto)
      .toPromise();
  }

  @Post('createAccessToken')
  async createAccessToken(@Body() userDto: UserDto): Promise<AuthResponseDto> {
    return this.authServiceClient
      .send({ cmd: 'auth.createAccessToken' }, userDto)
      .toPromise();
  }

  @Post('verifyAccessToken')
  async verifyAccessToken(@Body() token: string): Promise<AuthResponseDto> {
    return this.authServiceClient
      .send({ cmd: 'auth.verifyAccessToken' }, token)
      .toPromise();
  }

  @Post('createRefreshToken')
  async createRefreshToken(
    @Body() user: { userId: string },
  ): Promise<AuthResponseDto> {
    return this.authServiceClient
      .send({ cmd: 'auth.createRefreshToken' }, user)
      .toPromise();
  }

  @Post('validTokenSignUp')
  async validTokenSignUp(
    @Body() payload: { token: string },
  ): Promise<AuthResponseDto> {
    return this.authServiceClient
      .send({ cmd: 'auth.validTokenSignUp' }, payload)
      .toPromise();
  }
}
