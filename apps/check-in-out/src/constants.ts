import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

export const CHECK_IN_OUT_CONSTANTS = {
  PORT: process.env.CHECK_IN_OUT_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_CHECKINOUT,
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'check_in_out_queue',
    queueOptions: {
      durable: false,
    },
  },
};
