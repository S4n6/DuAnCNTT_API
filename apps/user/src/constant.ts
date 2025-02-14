import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

export const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
  ORGANIZATION: 'organization',
  STUDENT: 'student',
  TEACHER: 'teacher',
};

export const USER_CONSTANTS = {
  SECRET_HASH_PASSWORD: process.env.ENCODE_PASSWORD,
  MONGO_URL: process.env.MONGO_URL,
  HOST_AUTH_SERVICE: process.env.HOST_AUTH_SERVICE,
  PORT: process.env.USER_SERVICE_PORT,
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'user_queue',
    queueOptions: {
      durable: false,
    },
  },
};
