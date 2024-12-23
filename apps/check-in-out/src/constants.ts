import * as dotenv from 'dotenv';
dotenv.config();

export const CHECK_IN_OUT_CONSTANTS = {
  PORT: process.env.CHECK_IN_OUT_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_CHECKINOUT,
};
