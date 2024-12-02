import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { UserService } from './user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserService;
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_PACKAGE') private client: ClientGrpc,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  async login(
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<object> {
    const payload = { email, phoneNumber, password };
    const user = await this.validateUser(email, phoneNumber, password);
    const access_token = await this.jwtService.sign(payload);
    if (!user.success) {
      return null;
    }
    return {
      access_token,
    };
  }

  async validateUser(
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<any> {
    if (email) {
      const user = await this.userService
        .validateUserByEmail({ email, password })
        .toPromise();
      return user;
    }

    if (phoneNumber) {
      const user = await this.userService
        .validateUserByPhoneNumber({ phoneNumber, password })
        .toPromise();
      return user;
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
    return token.save();
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
