import * as dotenv from 'dotenv';

dotenv.config();

export const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
  ORGANIZATION: 'organization',
  STUDENT: 'student',
  TEACHER: 'teacher',
};

export const USER_CONSTANTS = {
  SECRET_HASH_PASSWORD: process.env.SECRET_HASH_PASSWORD,
  MONGO_URL: process.env.MONGO_URL,
  HOST_AUTH_SERVICE: process.env.HOST_AUTH_SERVICE,
};
