import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.response';
import { Response } from 'express';
import { LoginRequestDto } from './auth.requestLogin';
import { UserDto } from './user.dto';
import { jwtConstants } from './constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res() res: Response,
    @Body() user: LoginRequestDto,
  ): Promise<any> {
    const access_token = await this.authService.login(
      user.email,
      user.phoneNumber,
      user.password,
    );
    if (!access_token) {
      return res.status(400).json({
        success: false,
        message: 'Login failed',
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Login successfully',
      data: {
        access_token,
      },
    });
  }

  @Post('/createAccessToken')
  async createAccessToken(@Res() res: Response, @Body() user: UserDto) {
    const access_token = await this.authService.createAccessToken(user);
    return res.status(200).json({
      success: true,
      message: 'Access token created successfully',
      data: {
        access_token,
      },
    });
  }

  @Get('/verifyAccessToken/:token')
  async verifyAccessToken(@Res() res: Response, token: string) {
    const isVerified = await this.authService.verifyAccessToken(token);
    return res.status(200).json({
      success: isVerified,
      message: isVerified ? 'Access token is valid' : 'Access token is invalid',
    });
  }

  @Post('/createRefreshToken')
  async createRefreshToken(@Res() res: Response, @Body() user: object) {
    const refresh_token = await this.authService.createRefreshToken(
      user?.userId,
      jwtConstants.JWT_EXPIRES_IN_REFRESH_TOKEN,
    );
    return res.status(200).json({
      success: true,
      message: 'Refresh token created successfully',
      data: {
        refresh_token,
      },
    });
  }
}
