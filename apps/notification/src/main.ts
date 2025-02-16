import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { ValidationPipe } from '@nestjs/common';
import { RMQ_CONFIG } from './constants';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3003);
  console.log(`Notification service is running on: ${await app.getUrl()}`);
  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  await microservice.listen();
  console.log('Notification service is listening for messages from RabbitMQ');
}
bootstrap();
