import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { AUTH_CONSTANTS, RMQ_CONFIG } from './constants';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  // await app.listen(AUTH_CONSTANTS.PORT);
  // console.log(`Auth service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [AUTH_CONSTANTS.RABBITMQ_URL],
      queue: 'auth_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await microservice.listen();
  console.log('Auth service is listening for messages from RabbitMQ');
}
bootstrap();
