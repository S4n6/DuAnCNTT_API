import { NestFactory } from '@nestjs/core';
import { RegistrationModule } from './registration.module';
import { REGISTRATION_CONSTANT } from './constant';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from './config/rabbitmq.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RegistrationModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(REGISTRATION_CONSTANT.PORT);
  console.log(`Registration service is running on: ${await app.getUrl()}`);
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: rabbitmqConfig.options,
  };
  const microservice = await NestFactory.createMicroservice(
    RegistrationModule,
    microserviceOptions,
  );

  app.connectMicroservice(microserviceOptions);
  await microservice.listen();
}
bootstrap();
