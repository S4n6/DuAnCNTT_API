import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ROLE, USER_CONSTANTS } from './constant';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import { UserResponseDto } from './user.response';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { TokenDevice } from './tokenDevice.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly httpService: HttpService,
    @InjectModel(TokenDevice.name) private tokenDeviceModel: Model<TokenDevice>,
  ) {}

  async getAllUsers(): Promise<UserResponseDto> {
    const users: User[] = await this.userModel.find();
    if (!users) {
      return new UserResponseDto(false, 'Users not found', null);
    }
    return new UserResponseDto(true, 'Users found', {
      users,
      total: users.length,
    });
  }

  async getUserByName(
    name: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<UserResponseDto> {
    console.log('name:', name);
    const query = { fullName: { $regex: name, $options: 'i' } };
    const users = await this.userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!users || users.length === 0) {
      return new UserResponseDto(false, 'User not found');
    }

    const total = await this.userModel.countDocuments(query);

    return new UserResponseDto(true, 'User found', {
      users,
      total,
      page,
    });
  }

  async searchUsers(
    name?: string,
    email?: string,
    isActive?: boolean,
    page: number = 1,
    limit: number = 10,
  ): Promise<UserResponseDto> {
    const query: any = {};
    if (name) {
      query.fullName = { $regex: name, $options: 'i' };
    }
    if (email) {
      query.email = email;
    }
    if (isActive) {
      query.isActive = isActive;
    }

    const users = await this.userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!users || users.length === 0) {
      return new UserResponseDto(false, 'No users found');
    }

    const total = await this.userModel.countDocuments(query);

    return new UserResponseDto(true, 'Users found', {
      users,
      total,
      page,
    });
  }

  async getTokenDevicesByUserId(userId: ObjectId): Promise<UserResponseDto> {
    try {
      const tokenDevices = await this.tokenDeviceModel
        .find({ user: userId })
        .exec();
      return new UserResponseDto(true, 'Token devices found', null);
    } catch (error) {
      console.error('Error fetching token devices by user ID:', error);
      return new UserResponseDto(
        false,
        'Failed to fetch token devices by user ID',
      );
    }
  }

  async getUserById(id: ObjectId): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id);
    if (!user) {
      return new UserResponseDto(false, 'User not found');
    }
    return new UserResponseDto(true, 'User found', {
      users: user,
    });
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return new UserResponseDto(false, 'User not found');
    }
    return new UserResponseDto(true, 'User found', {
      users: user,
    });
  }

  async changeRole(id: ObjectId, role: string): Promise<UserResponseDto> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return new UserResponseDto(false, 'User not found');
      }

      console.log('role:', role);
      if (!Object.values(ROLE).includes(role)) {
        return new UserResponseDto(false, 'Invalid role');
      }

      user.role = role;
      await user.save();
      return new UserResponseDto(true, 'Role changed successfully', {
        users: user,
      });
    } catch (error) {
      console.error('Error changing role:', error);
      return new UserResponseDto(false, 'Role change failed');
    }
  }

  async createUserByPhoneNumber(user: UserDto): Promise<UserResponseDto> {
    try {
      const checkedUser = await this.getUserByPhoneNumber(user.phoneNumber);

      if (checkedUser.success) {
        return new UserResponseDto(false, 'User already exists');
      }

      if (!Object.values(ROLE).includes(user.role as string)) {
        return new UserResponseDto(false, 'Invalid role');
      }

      const secretHashPassword = USER_CONSTANTS.SECRET_HASH_PASSWORD;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(
        user.password + secretHashPassword,
        salt,
      );
      const createdUser = new this.userModel(user);
      await createdUser.save();
      return new UserResponseDto(true, 'User created successfully', {
        users: createdUser,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return new UserResponseDto(false, 'User creation failed');
    }
  }

  async createTokenDevice(
    userId: ObjectId,
    tokenDeviceData: string,
  ): Promise<UserResponseDto> {
    try {
      const tokenDevice = new this.tokenDeviceModel({
        user: userId,
        token: tokenDeviceData,
      });
      await tokenDevice.save();
      return new UserResponseDto(true, 'Token device created successfully');
    } catch (error) {
      console.error('Error creating token device:', error);
      return new UserResponseDto(false, 'Token device creation failed');
    }
  }

  async updateUser(user: UserDto, id: ObjectId): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userModel.findById(id);
      if (!existingUser) {
        return new UserResponseDto(false, 'User not found');
      }

      Object.assign(existingUser, user);
      await existingUser.save();
      return new UserResponseDto(true, 'User updated successfully', {
        users: existingUser,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return new UserResponseDto(false, 'User update failed');
    }
  }

  async deleteUser(id: ObjectId): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userModel.findById(id);
      if (!existingUser) {
        return new UserResponseDto(false, 'User not found');
      }

      await existingUser.deleteOne();
      return new UserResponseDto(true, 'User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      return new UserResponseDto(false, 'User deletion failed');
    }
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<UserResponseDto> {
    const user: User = await this.userModel.findOne({ phoneNumber });
    if (!user) {
      return new UserResponseDto(false, 'User not found');
    }
    return new UserResponseDto(true, 'User found', {
      users: user,
    });
  }

  async createUserByEmail(user: UserDto): Promise<UserResponseDto> {
    try {
      const checkedUser = await this.getUserByEmail(user.email);

      if (checkedUser.success) {
        return new UserResponseDto(false, 'User already exists');
      }

      if (!Object.values(ROLE).includes(user.role as string)) {
        return new UserResponseDto(false, 'Invalid role');
      }

      const secretHashPassword = USER_CONSTANTS.SECRET_HASH_PASSWORD;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(
        user.password + secretHashPassword,
        salt,
      );

      const createdUser = new this.userModel(user);
      await createdUser.save();
      // const response = await lastValueFrom(
      //   this.httpService.post(
      //     `${USER_CONSTANTS.HOST_AUTH_SERVICE}/api/auth/createRefreshToken`,
      //     // 'http://auth-service:3000/api/auth/createRefreshToken',
      //     { userId: createdUser._id },
      //   ),
      // );

      // if (!response.data.success) {
      //   return new UserResponseDto(
      //     false,
      //     response?.data?.message ||
      //       'User created failed due to creating refresh token',
      //     null,
      //   );
      // }

      return new UserResponseDto(true, 'User created successfully', {
        users: createdUser,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return new UserResponseDto(
        false,
        error?.message || 'User creation failed',
      );
    }
  }

  async validateUserByEmail(data: {
    username: string;
    password: string;
  }): Promise<UserResponseDto> {
    const secretHashPassword = USER_CONSTANTS.SECRET_HASH_PASSWORD;
    const user = await this.getUserByEmail(data.username);
    if (!user?.success) {
      return new UserResponseDto(false, 'User not found');
    }

    const userData = user?.data?.users as unknown as User;
    const isPasswordValid = await bcrypt.compare(
      data.password + secretHashPassword,
      userData.password,
    );

    if (!isPasswordValid) {
      return new UserResponseDto(false, 'Invalid password', {
        users: null,
      });
    }

    return new UserResponseDto(true, 'User validated successfully', {
      users: userData,
    });
  }

  async validateUserByPhoneNumber(data): Promise<UserResponseDto> {
    const user = await this.userModel
      .findOne({ phoneNumber: data.phoneNumber })
      .exec();
    if (!user) {
      return new UserResponseDto(false, 'User not found');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return new UserResponseDto(false, 'Invalid password');
    }
    return new UserResponseDto(true, 'User validated successfully');
  }
}
