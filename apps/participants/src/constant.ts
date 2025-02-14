import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

export const PARTICIPANT_CONSTANT = {
  PORT: process.env.PARTICIPANT_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_PARTICIPANTS,
};

export const ROLE_CONSTANT = {
  SPEAKER: 'speaker',
  GUEST: 'guest',
  ORGANIZER: 'organizer',
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'participant_queue',
    queueOptions: {
      durable: false,
    },
  },
};
