import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

export const FORUM_CONSTANTS = {
  PORT: process.env.FORUM_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_FORUM,
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'forum_queue',
    queueOptions: {
      durable: false,
    },
  },
};
