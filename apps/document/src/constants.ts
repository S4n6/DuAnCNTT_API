import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

export const DOCUMENTS_CONSTANTS = {
  PORT: process.env.DOCUMENT_SERVICE_PORT,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  URL_SERVICE_UPLOAD: process.env.URL_SERVICE_UPLOAD,
  MONGO_URL: process.env.MONGO_URL_DOCUMENTS,
};

export const RMQ_CONFIG = {
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],
    queue: 'document_queue',
    queueOptions: {
      durable: false,
    },
  },
};
