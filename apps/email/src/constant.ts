import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

export const EMAIL_CONSTANT = {
  EMAIL_TYPE: {
    NOTIFY: 'notify',
    SIGNUP: 'signup',
  },
  PORT: process.env.EMAIL_SERVICE_PORT,
  EMAIL_CONFIG: {
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'email_queue',
    queueOptions: {
      durable: false,
    },
  },
};
