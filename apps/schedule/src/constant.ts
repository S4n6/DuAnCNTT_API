import * as dotenv from 'dotenv';
dotenv.config();

export const SCHEDULE_CONSTANTS = {
  PORT: process.env.SCHEDULE_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_SCHEDULE,
};
