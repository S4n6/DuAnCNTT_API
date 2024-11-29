import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserService;
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  async login(username: string, password: string): Promise<object> {
    const payload = { username, password };
    const user = await this.validateUser(username, password);
    const access_token = await this.jwtService.sign(payload);
    if (!user) {
      return null;
    }

    console.log(user);
    console.log(access_token);

    return {
      access_token,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserById({ userId: '1' });
    return user;
  }

  async registerByEmail(user: any): Promise<any> {
    const newUser = await this.userService.createUserByEmail({ user });
    return newUser;
  }
}
