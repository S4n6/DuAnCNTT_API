import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.response';
import { Response } from 'express';
import { LoginRequestDto } from './auth.requestLogin';
import { UserDto } from './user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res() res: Response,
    @Body() user: LoginRequestDto,
  ): Promise<any> {
    const payload = {
      username: user.email ?? user.phoneNumber,
      password: user.password,
    };
    const access_token = await this.authService.login(
      payload.username,
      payload.password,
    );
    return res.status(200).json({
      success: true,
      message: 'Login successfully',
      data: {
        access_token,
      },
    });
  }

  @Post('registerEmail')
  async registerByEmail(
    @Res() res: Response,
    @Body() userRegister: UserDto,
  ): Promise<any> {
    const user = await this.authService.registerByEmail(userRegister);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Register by email failed',
        data: {},
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Register by email successfully',
      data: {
        user,
      },
    });
  }

  // @Post('registerPhone')
  // async login(@Res() res: Response, @Body() user: any): Promise<any> {
  //   const payload = { username: user.username, password: user.password };
  //   const access_token = await this.authService.login(
  //     payload.username,
  //     payload.password,
  //   );
  //   return res.status(200).json({
  //     success: true,
  //     message: 'Login successful',
  //     data: {
  //       access_token,
  //     },
  //   });
  // }
}
