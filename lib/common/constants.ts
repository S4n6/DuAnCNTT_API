import * as dotenv from 'dotenv';
dotenv.config();

export const COMMON_CONSTANTS = {
  JWT_SECRET: process.env.JWT_SECRET,
};
