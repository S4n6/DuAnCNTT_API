import { Transport } from '@nestjs/microservices';
import { REGISTRATION_CONSTANT } from '../constant';

export const rabbitmqConfig = {
  options: {
    urls: [REGISTRATION_CONSTANT.RABBITMQ_URL],
    queue: 'registration_queue',
    queueOptions: {
      durable: false,
    },
  },
};
