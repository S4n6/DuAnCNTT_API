import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { EMAIL_CONSTANT, RMQ_CONFIG } from './constant';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  await app.listen(EMAIL_CONSTANT.PORT);
  console.log(`Email service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  microservice.listen();
  console.log('Email service is listening for messages from RabbitMQ');
}
bootstrap();
