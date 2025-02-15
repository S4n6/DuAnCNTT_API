import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.response';
import { LoginRequestDto } from './auth.request';
import { UserDto } from './user.dto';
import { jwtConstants } from './constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() user: LoginRequestDto): Promise<object> {
    console.log('login', user);
    const access_token = await this.authService.login(
      user.email,
      user.phoneNumber,
      user.password,
    );
    if (!access_token) {
      return {
        success: false,
        message: 'Login failed',
        data: {},
      };
    }
    return {
      success: true,
      message: 'Login successfully',
      data: {
        ...access_token,
      },
    };
  }

  @MessagePattern({ cmd: 'loginGgwithToken' })
  async verifyToken(@Payload() body: { token: string }) {
    try {
      const decoded = await this.authService.loginGgWithToken(body.token);
      return {
        success: true,
        message: 'Token is valid',
        data: decoded,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Token is invalid',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'register' })
  async register(@Payload() user: UserDto) {
    const result = await this.authService.register(user);
    return result;
  }

  @MessagePattern({ cmd: 'createAccessToken' })
  async createAccessToken(@Payload() user: UserDto) {
    const access_token = await this.authService.createAccessToken(user);
    return {
      success: true,
      message: 'Access token created successfully',
      data: {
        access_token,
      },
    };
  }

  @MessagePattern({ cmd: 'verifyAccessToken' })
  async verifyAccessToken(@Payload() token: string) {
    const isVerified = await this.authService.verifyAccessToken(token);
    return {
      success: isVerified,
      message: isVerified ? 'Access token is valid' : 'Access token is invalid',
    };
  }

  @MessagePattern({ cmd: 'createRefreshToken' })
  async createRefreshToken(@Payload() user: { userId: string }) {
    try {
      const refresh_token = await this.authService.createRefreshToken(
        user?.userId,
        jwtConstants.JWT_EXPIRES_IN_REFRESH_TOKEN,
      );
      return {
        success: true,
        message: 'Refresh token created successfully',
        data: {
          refresh_token,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error creating refresh token',
        error: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'validTokenSignUp' })
  async validTokenSignUp(@Payload() payload: { token: string }) {
    const result = await this.authService.validTokenSignUp(payload.token);
    return result;
  }
}
