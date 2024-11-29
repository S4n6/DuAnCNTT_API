import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ROLE } from './constant';

@Injectable()
export class UserService {

  async getUserById(id: string): Promise<UserDto> {
    return {
      id: id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'abc@example.com',
      phoneNumber: '1234567890',
      role: ROLE.STUDENT,
    };
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'abc@example.com',
      phoneNumber: '1234567890',
      role: ROLE.STUDENT,
    };
  }

  async getUserByPhone(phone: string): Promise<UserDto> {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'abc@example.com',
      phoneNumber: '1234567890',
      role: ROLE.STUDENT,
    };
  }

  async createUserByEmail(user: UserDto): Promise<UserDto> {
    console.log('Registering user by email...');
    return user;
  }
}
