import * as dotenv from 'dotenv';
dotenv.config();

export const EVENT_CONSTANTS = {
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE_EVENT,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_URL: process.env.POSTGRES_URL + process.env.POSTGRES_DATABASE_EVENT,
  PORT: process.env.EVENT_SERVICE_PORT,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};
