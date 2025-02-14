import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

export const REGISTRATION_CONSTANT = {
  PORT: process.env.REGISTRATION_SERVICE_PORT,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  POSTGRES_URL:
    process.env.POSTGRES_URL + process.env.POSTGRES_DATABASE_REGISTRATION,
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'registration_queue',
    queueOptions: {
      durable: false,
    },
  },
};
