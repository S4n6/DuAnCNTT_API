import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth.controller';
import { AuthService } from '../src/auth.service';
import { UserDto } from '../src/user.dto';
import { LoginRequestDto } from '../src/auth.request';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            createAccessToken: jest.fn(),
            verifyAccessToken: jest.fn(),
            createRefreshToken: jest.fn(),
            validTokenSignUp: jest.fn(),
            validateOAuthLogin: jest.fn(),
            loginGgWithToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token on successful login', async () => {
      const result = { access_token: 'test_token' };
      jest.spyOn(authService, 'login').mockResolvedValue(result);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const loginDto: LoginRequestDto = {
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'password',
      };

      await authController.login(res, loginDto);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Login successfully',
        data: result,
      });
    });

    it('should return 400 on failed login', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(null);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const loginDto: LoginRequestDto = {
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'password',
      };

      await authController.login(res, loginDto);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Login failed',
        data: {},
      });
    });
  });

  describe('register', () => {
    it('should return result on successful registration', async () => {
      const result = { success: true, message: 'User registered successfully' };
      jest.spyOn(authService, 'register').mockResolvedValue(result);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const userDto: UserDto = {
        fullName: 'Test User',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'password',
        role: 'student',
      };

      await authController.register(res, userDto);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(result);
    });

    it('should return 400 on failed registration', async () => {
      const result = { success: false, message: 'Registration failed' };
      jest.spyOn(authService, 'register').mockResolvedValue(result);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const userDto: UserDto = {
        fullName: 'Test User',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        password: 'password',
        role: 'student',
      };

      await authController.register(res, userDto);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

});