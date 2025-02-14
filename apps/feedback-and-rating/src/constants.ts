import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

export const FEEDBACK_RATING_CONSTANTS = {
  PORT: process.env.FEEDBACK_RATING_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_RATING,
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'feedback_rating_queue',
    queueOptions: {
      durable: false,
    },
  },
};
