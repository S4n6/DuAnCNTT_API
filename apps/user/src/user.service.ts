import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ROLE, SECRET_HASH_PASSWORD } from './constant';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserResponseDto, UserResponseType } from './user.response';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id);
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    return {
      success: true,
      message: 'User found',
      data: user,
    };
  }

  async getUserByEmail(email: string): Promise<object> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    return {
      success: true,
      message: 'User found',
      data: user,
    };
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<object> {
    const user = await this.userModel.findOne({ phoneNumber });
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    return {
      success: true,
      message: 'User found',
      data: user,
    };
  }

  async createUserByEmail(user: UserDto): Promise<UserResponseDto> {
    try {
      const checkedUser = await this.getUserByEmail(user.email);

      if (checkedUser.success) {
        return {
          success: false,
          message: 'User already exists',
        };
      }

      if (!Object.values(ROLE).includes(user.role as string)) {
        return {
          success: false,
          message: 'Invalid role',
        };
      }

      const secretHashPassword = process.env.SECRET_HASH_PASSWORD;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(
        user.password + secretHashPassword,
        salt,
      );
      const createdUser = new this.userModel(user);
      await createdUser.save();
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:3000/createRefreshToken', {
          userId: createdUser._id,
        }),
      );
      console.log('response', response);
      return {
        success: true,
        message: 'User created successfully',
        data: createdUser,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return {
        success: false,
        message: 'User creation failed',
      };
    }
  }

  async validateUserByEmail(data): Promise<object> {
    const user = await this.getUserByEmail(data.username);
    if (!user?.success) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    console.log('user', user);
    const secretHashPassword = SECRET_HASH_PASSWORD;
    const isPasswordValid = await bcrypt.compare(
      data.password + secretHashPassword,
      user?.data.password,
    );
    console.log('isPasswordValid', isPasswordValid);

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid password',
      };
    }
    return {
      success: true,
      message: 'User validated successfully',
    };
  }

  async validateUserByPhoneNumber(data): Promise<object> {
    const user = await this.userModel
      .findOne({ phoneNumber: data.phoneNumber })
      .exec();
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid password',
      };
    }
    return {
      success: true,
      message: 'User validated successfully',
    };
  }
}
