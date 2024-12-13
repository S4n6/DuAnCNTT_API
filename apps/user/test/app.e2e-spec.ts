import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './../src/user.module';
import { UserService } from './../src/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './../src/user.schema';
import { Connection, ObjectId } from 'mongoose';
import { USER_CONSTANTS } from '../src/constant';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  let userId: ObjectId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, MongooseModule.forRoot(USER_CONSTANTS.MONGO_URL)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    connection = app.get<Connection>('DatabaseConnection');
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean up the database before each test
    await connection.collection('users').deleteMany({});
  });

  it('/api/users/createUserByEmail (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/users/createUserByEmail')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password',
        role: 'user',
      })
      .expect(201);

    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email', 'jane.doe@example.com');

    userId = response.body.data._id;
  });

  it('/api/users (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty('firstName', 'Jane');
        expect(res.body.data[0]).toHaveProperty('lastName', 'Doe');
        expect(res.body.data[0]).toHaveProperty(
          'email',
          'jane.doe@example.com',
        );
        expect(res.body.data[0]).toHaveProperty('role', 'user');
      });
  });

  it('/api/users/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/api/users/${userId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id', userId);
        expect(res.body.data).toHaveProperty('firstName', 'Jane');
        expect(res.body.data).toHaveProperty('lastName', 'Doe');
        expect(res.body.data).toHaveProperty('email', 'jane.doe@example.com');
        expect(res.body.data).toHaveProperty('role', 'user');
      });
  });

  it('/api/users/:id (PATCH)', async () => {
    return request(app.getHttpServer())
      .patch('/api/users/' + userId)
      .send({ firstName: 'John', lastName: 'Smith' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('firstName', 'John');
        expect(res.body.data).toHaveProperty('lastName', 'Smith');
      });
  });

  it('/api/users/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/api/users/' + userId)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.success).toBe(true);
      });
  });
});
