import * as dotenv from 'dotenv';

dotenv.config();

export const PARTICIPANT_CONSTANT = {
  PORT: process.env.PARTICIPANT_SERVICE_PORT,
  MONGO_URL: process.env.MONGO_URL_PARTICIPANTS,
};

export const ROLE_CONSTANT = {
  SPEAKER: 'speaker',
  GUEST: 'guest',
  ORGANIZER: 'organizer',
};
