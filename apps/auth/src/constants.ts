import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN_REFRESH_TOKEN: process.env.JWT_EXPIRES_IN_REFRESH_TOKEN,
  JWT_EXPIRES_IN_ACCESS_TOKEN: process.env.JWT_EXPIRES_IN_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN_HASH_SECRET: process.env.JWT_REFRESH_TOKEN_HASH_SECRET,
};

export const AUTH_CONSTANTS = {
  PORT: process.env.AUTH_SERVICE_PORT,
  GRPC_HOST_USER_SERVICE: process.env.GRPC_HOST_USER_SERVICE,
  SECRET_HASH_PASSWORD: process.env.ENCODE_PASSWORD,
  GG_CLIENT_ID: process.env.GG_CLIENT_ID,
  GG_CLIENT_SECRET: process.env.GG_CLIENT_SECRET,
  GG_CALLBACK_URL: process.env.GG_CALLBACK_URL,
  MONGO_URL: process.env.MONGO_URL,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'auth_queue',
    queueOptions: {
      durable: false,
    },
  },
};
