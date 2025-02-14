import { Transport } from '@nestjs/microservices';
import { API_GATEWAY_CONSTANTS } from '../constant';
import { RmqOptions } from '@nestjs/microservices';

export const createRmqConfig = (
  name: string,
  queue: string,
): RmqOptions & { name: string } => ({
  name,
  transport: Transport.RMQ,
  options: {
    urls: [API_GATEWAY_CONSTANTS.RABBITMQ_URL],
    queue,
    queueOptions: {
      durable: false,
    },
  },
});

export const RMQ_CONFIG = [
  createRmqConfig('AUTH_SERVICE', 'auth_queue'),
  createRmqConfig('USER_SERVICE', 'document_queue'),
  createRmqConfig('EVENT_SERVICE', 'event_queue'),
  createRmqConfig('NOTIFICATION_SERVICE', 'notification_queue'),
  createRmqConfig('DOCUMENT_SERVICE', 'document_queue'),
  createRmqConfig('PARTICIPANTS_SERVICE', 'participants_queue'),
  createRmqConfig('CHECK_IN_OUT_SERVICE', 'check_in_out_queue'),
  createRmqConfig('EMAIL_SERVICE', 'email_queue'),
  createRmqConfig('FEEDBACK_AND_RATING_SERVICE', 'feedback_and_rating_queue'),
  createRmqConfig('SCHEDULE_SERVICE', 'schedule_queue'),
  createRmqConfig('FORUM_SERVICE', 'forum_queue'),
];
