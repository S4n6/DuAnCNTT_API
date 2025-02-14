import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';
import { ValidationPipe } from '@nestjs/common';
import { EVENT_CONSTANTS } from './constants';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  await app.listen(EVENT_CONSTANTS.PORT);
  console.log(`Event service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [EVENT_CONSTANTS.RABBITMQ_URL],
      queue: 'event_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await microservice.listen();
  console.log('Event service is listening for messages from RabbitMQ');
}
bootstrap();
