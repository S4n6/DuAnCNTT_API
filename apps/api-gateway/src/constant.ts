import * as dotenv from 'dotenv';
dotenv.config();

export const API_GATEWAY_CONSTANTS = {
  PORT: process.env.API_GATEWAY_PORT || 8000,
  EVENT_SERVICE_URL: process.env.EVENT_SERVICE_URL,
  EVENT_SERVICE_PORT: process.env.EVENT_SERVICE_PORT,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  USER_SERVICE_PORT: process.env.USER_SERVICE_PORT,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE_API_GATEWAY,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_URL:
    process.env.POSTGRES_URL + process.env.POSTGRES_DATABASE_API_GATEWAY,
};
