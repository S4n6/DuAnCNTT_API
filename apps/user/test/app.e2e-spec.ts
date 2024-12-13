import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './../src/user.module';
import { UserService } from './../src/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './../src/user.schema';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const userService = {
    getAllUsers: () => [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    ],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
      });
  });

  it('/api/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/users/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id', '1');
      });
  });

  it('/api/users/createUserByEmail (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users/createUserByEmail')
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('email', 'jane.doe@example.com');
      });
  });

  it('/api/users/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/api/users/1')
      .send({ name: 'John Smith' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('name', 'John Smith');
      });
  });

  it('/api/users/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/users/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
      });
  });
});
