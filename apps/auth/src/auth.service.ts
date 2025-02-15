import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from './constants';
import { HttpService } from '@nestjs/axios';
import { AuthResponseDto } from './auth.response';
import { decrypt, encrypt } from './crypto.util';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserService;
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private readonly httpService: HttpService,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  onModuleInit() {}

  async login(
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<object> {
    const payload = { email, phoneNumber, password };
    const user = await this.userServiceClient.send({ cmd: 'validateUserByEmail' }, { email, password }).toPromise();
    const access_token = await this.jwtService.sign(payload);
    if (!user.success) {
      return null;
    }
    return {
      user: user.data.users,
      access_token,
    };
  }

  async register(user: UserDto): Promise<AuthResponseDto> {
    try {
      console.log('register...', user);
      const isUserExist = await this.httpService
        .get('http://localhost:3001/api/users/email/' + user.email)
        .toPromise();

      if (!isUserExist.data.success) {
        const hashedPassword = encrypt(user.password);
        user.password = hashedPassword;
        const verificationToken = this.jwtService.sign(
          { user },
          { expiresIn: '1h' },
        );
        const templateEmail = {
          to: user.email,
          subject: 'Tạo tài khoản',
          text:
            'Để đăng kí tài khoản mời bạn nhấn vào link sau đây http://localhost:3000/api/auth/validTokenSignUp/' +
            verificationToken,
        };

        const sendMail = await this.httpService
          .post('http://localhost:3007/api/email/notify', {
            email: templateEmail,
          })
          .toPromise();
        console.log('sendMail', sendMail.data);
        if (sendMail.data.success) {
          return new AuthResponseDto(true, 'Email sent', {});
        } else {
          return new AuthResponseDto(false, 'Error sending email', {});
        }
      } else {
        return new AuthResponseDto(false, 'User already exists', {});
      }
    } catch (error) {
      console.log('error', error);
      return new AuthResponseDto(false, 'Error creating user', {});
    }
  }

  async validateUser(
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<any> {
    if (email) {
      const user = await this.userService
        .validateUserByEmail({
          email,
          password,
        })
        .toPromise();
      console.log('user validata::', user);
      return user;
    }
  }

  async validateOAuthLogin(user: any): Promise<string> {
    const payload = {
      email: user?.user?.email,
      fullName: user?.user?.firstName + ' ' + user?.user?.lastName,
      avatar: user?.user?.picture,
      role: 'student',
    };

    return this.jwtService.sign(payload);
  }

  async validTokenSignUp(token: string): Promise<AuthResponseDto> {
    try {
      console.log('before', token);

      const decoded = this.jwtService.verify(token);
      console.log('decoded', decoded);
      if (decoded) {
        const user = decoded.user;
        user.password = decrypt(user.password);
        const response = await lastValueFrom(
          this.httpService.post('http://localhost:3001/api/users/', user),
        );
        const userCreated = response.data;
        if (userCreated.success) {
          return new AuthResponseDto(true, 'User created successfully', {});
        } else {
          return new AuthResponseDto(false, userCreated.message, {});
        }
      }

      return new AuthResponseDto(true, 'Token is valid', {});
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return new AuthResponseDto(false, 'Token is expired', {});
      }
      return new AuthResponseDto(false, 'Token is invalid', {});
    }
  }

  async loginGgWithToken(token: string): Promise<object> {
    try {
      const decoded = this.jwtService.verify(token);
      console.log('decoded', decoded);
      if (decoded) {
        const user = {
          email: decoded.email,
          fullName: decoded.fullName,
          avatar: decoded.avatar,
          role: 'user',
        };
        const isUserExist = await this.httpService
          .get(`http://localhost:3001/api/users/email/${user.email}`)
          .toPromise();

        if (!isUserExist.data.success) {
          const response = await lastValueFrom(
            this.httpService.post('http://localhost:3001/api/users/', user),
          );
          const userCreated = response.data;
          if (userCreated.success) {
            const accessToken = await this.createAccessToken(user);
            delete userCreated.data.users.password;
            return { user: userCreated.data.users, accessToken };
          } else {
            throw new Error('Error creating user');
          }
        } else {
          const accessToken = await this.createAccessToken(user);
          delete isUserExist.data.data.users.password;
          console.log('accessToken', isUserExist.data);
          return { user: isUserExist.data?.data?.users, accessToken };
        }
      }
    } catch (error) {
      throw new Error('Token is invalid');
    }
  }

  async createAccessToken(user): Promise<string> {
    return this.jwtService.sign(user, {
      expiresIn: jwtConstants.JWT_EXPIRES_IN_ACCESS_TOKEN,
    });
  }

  async verifyAccessToken(token: string): Promise<object> {
    try {
      this.jwtService.verify(token, { ignoreExpiration: false });
      return { success: true, message: 'Access token is valid' };
    } catch (error) {
      return { success: false, message: 'Access token is invalid' };
    }
  }

  async createRefreshToken(userId: string, expiresIn: string): Promise<Token> {
    try {
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const refreshToken = this.jwtService.sign({ userId }, { expiresIn });
      // Hash the refresh token before storing it
      const salt = await bcrypt.genSalt(10);
      const hashedRefreshToken = await bcrypt.hash(
        refreshToken + jwtConstants.JWT_REFRESH_TOKEN_HASH_SECRET,
        salt,
      );
      const token = new this.tokenModel({
        userId,
        refreshToken: hashedRefreshToken,
        expiresAt,
      });
      return await token.save();
    } catch (error) {
      throw new Error('Error creating refresh token: ' + error.message);
    }
  }

  async findRefreshToken(userId: string): Promise<Token> {
    return this.tokenModel.findOne({ _id: userId }).exec();
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    await this.tokenModel.deleteOne({ refreshToken }).exec();
  }

  async validateRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<object> {
    const token = await this.findRefreshToken(userId);
    if (!token) {
      return { success: false, message: 'Refresh token not found' };
    }

    const isMatch = await bcrypt.compare(
      refreshToken + jwtConstants.JWT_REFRESH_TOKEN_HASH_SECRET,
      token.refreshToken,
    );
    if (!isMatch) {
      return { success: false, message: 'Refresh token is invalid' };
    }

    try {
      this.jwtService.verify(refreshToken);
      return { success: true, message: 'Refresh token is valid' };
    } catch (error) {
      return { success: false, message: 'Refresh token is invalid' };
    }
  }
}
