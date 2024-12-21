import * as dotenv from 'dotenv';

dotenv.config();

export const EMAIL_CONSTANT = {
  EMAIL_TYPE: {
    NOTIFY: 'notify',
    SIGNUP: 'signup',
  },
  PORT: process.env.EMAIL_SERVICE_PORT,
  EMAIL_CONFIG: {
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};
