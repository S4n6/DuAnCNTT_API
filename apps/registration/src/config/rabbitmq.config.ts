import { Transport } from '@nestjs/microservices';
import { REGISTRATION_CONSTANT } from '../constant';

console.log(REGISTRATION_CONSTANT.RABBITMQ_URL);

export const rabbitmqConfig = {
  options: {
    urls: [REGISTRATION_CONSTANT.RABBITMQ_URL],
    queue: 'registration_queue',
    queueOptions: {
      durable: false,
    },
  },
};
