import * as dotenv from 'dotenv';
dotenv.config();

export const FORUM_CONSTANTS = {
  PORT: process.env.FORUM_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_FORUM,
};
