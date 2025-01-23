import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.response';
import { Response } from 'express';
import { LoginRequestDto } from './auth.request';
import { UserDto } from './user.dto';
import { jwtConstants } from './constants';

import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res() res: Response,
    @Body() user: LoginRequestDto,
  ): Promise<any> {
    console.log('login...', user);
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
        ...access_token,
      },
    });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('googleAuth...', req);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user } = req;
    const access_token = await this.authService.validateOAuthLogin(user);
    // return res.redirect(`http://localhost:8081?token=${access_token}`);
    return res.status(200).json({
      success: true,
      message: 'Login successfully',
      data: {
        access_token,
      },
    });
  }

  @Post('register')
  async register(@Res() res: Response, @Body() user: UserDto) {
    const result = await this.authService.register(user);
    return res.status(result.success ? 200 : 400).json(result);
  }

  // API handle token
  @Post('createAccessToken')
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

  @Get('verifyAccessToken/:token')
  async verifyAccessToken(@Res() res: Response, token: string) {
    const isVerified = await this.authService.verifyAccessToken(token);
    return res.status(200).json({
      success: isVerified,
      message: isVerified ? 'Access token is valid' : 'Access token is invalid',
    });
  }

  @Post('createRefreshToken')
  async createRefreshToken(
    @Res() res: Response,
    @Body() user: { userId: string },
  ) {
    try {
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error creating refresh token',
        error: error.message,
      });
    }
  }

  @Get('validTokenSignUp/:token')
  async validTokenSignUp(
    @Res() res: Response,
    @Param() payload: { token: string },
  ) {
    const result = await this.authService.validTokenSignUp(payload.token);
    return res.status(result.success ? 200 : 400).json(result);
  }
}
