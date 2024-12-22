import * as dotenv from 'dotenv';

dotenv.config();

export const FEEDBACK_RATING_CONSTANTS = {
    PORT: process.env.FEEDBACK_RATING_SERVICE_PORT,
    MONGO_URL: process.env.MONGO_URL_RATING,

};