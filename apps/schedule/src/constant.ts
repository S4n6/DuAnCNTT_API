import * as dotenv from 'dotenv';

dotenv.config();

export const SCHEDULE_CONSTANTS = {
  PORT: process.env.SCHEDULE_SERVICE_PORT,
};
