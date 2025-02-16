import { NestFactory } from '@nestjs/core';
import { CheckInOutModule } from './check-in-out.module';
import { CHECK_IN_OUT_CONSTANTS, RMQ_CONFIG } from './constants';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(CheckInOutModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(CHECK_IN_OUT_CONSTANTS.PORT);
  console.log(`Check-in-out service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  microservice.listen();
  console.log('Check-in-out service is listening for messages from RabbitMQ');
}
bootstrap();
