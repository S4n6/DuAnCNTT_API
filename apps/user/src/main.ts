import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import {
  Transport,
  ClientOptions,
  MicroserviceOptions,
} from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RMQ_CONFIG, USER_CONSTANTS } from './constant';

dotenv.config();

const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: 'lib/common/user.proto',
    url: '0.0.0.0:5001',
  },
};

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.useGlobalPipes(new ValidationPipe());

  // await app.listen(USER_CONSTANTS.PORT || 3001);
  // console.log(`User service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  microservice.listen();
  console.log('User service is listening for messages from RabbitMQ');
}
bootstrap();
