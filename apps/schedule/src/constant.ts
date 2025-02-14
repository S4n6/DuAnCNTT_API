import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

export const SCHEDULE_CONSTANTS = {
  PORT: process.env.SCHEDULE_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_SCHEDULE,
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'schedule_queue',
    queueOptions: {
      durable: false,
    },
  },
};
