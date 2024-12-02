import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ROLE, SECRET_HASH_PASSWORD, USER_CONSTANTS } from './constant';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import { UserResponseDto, UserResponseType } from './user.response';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  async getAllUsers(): Promise<UserResponseDto> {
    const users: User[] = await this.userModel.find();
    if (!users) {
      return {
        success: false,
        message: 'Users not found',
      };
    }
    return {
      success: true,
      message: 'Users found',
      data: users,
    };
  }

  async getUserById(id: ObjectId): Promise<UserResponseDto> {
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

  async getUserByEmail(email: string): Promise<UserResponseDto> {
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

  async createUserByPhoneNumber(user: UserDto): Promise<UserResponseDto> {
    try {
      const checkedUser = await this.getUserByPhoneNumber(user.phoneNumber);

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

      const secretHashPassword = USER_CONSTANTS.SECRET_HASH_PASSWORD;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(
        user.password + secretHashPassword,
        salt,
      );
      const createdUser = new this.userModel(user);
      await createdUser.save();
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

  async updateUser(user: UserDto, id: ObjectId): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userModel.findById(id);
      if (!existingUser) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      Object.assign(existingUser, user);
      await existingUser.save();
      return {
        success: true,
        message: 'User updated successfully',
        data: existingUser,
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        success: false,
        message: 'User update failed',
      };
    }
  }

  async deleteUser(id: ObjectId): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userModel.findById(id);
      if (!existingUser) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      await existingUser.deleteOne();
      return {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      return {
        success: false,
        message: 'User deletion failed',
      };
    }
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<UserResponseDto> {
    const user: User = await this.userModel.findOne({ phoneNumber });
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

      const secretHashPassword = USER_CONSTANTS.SECRET_HASH_PASSWORD;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(
        user.password + secretHashPassword,
        salt,
      );
      const createdUser = new this.userModel(user);
      await createdUser.save();
      const response = await lastValueFrom(
        this.httpService.post(`${USER_CONSTANTS.HOST_AUTH_SERVICE}`, {
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

  async validateUserByEmail(data): Promise<UserResponseDto> {
    const secretHashPassword = USER_CONSTANTS.SECRET_HASH_PASSWORD;
    const user = await this.getUserByEmail(data.username);
    if (!user?.success) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    const userData = user?.data as User;
    const isPasswordValid = await bcrypt.compare(
      data.password + secretHashPassword,
      userData.password,
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

  async validateUserByPhoneNumber(data): Promise<UserResponseDto> {
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
