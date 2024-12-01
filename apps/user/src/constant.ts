import * as dotenv from 'dotenv';

dotenv.config();

export const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
  ORGANIZATION: 'organization',
  STUDENT: 'student',
  TEACHER: 'teacher',
};

export const SECRET_HASH_PASSWORD = process.env.SECRET_HASH_PASSWORD;
