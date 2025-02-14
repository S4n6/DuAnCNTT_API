import { NestFactory } from '@nestjs/core';
import { ParticipantsModule } from './participants.module';
import { PARTICIPANT_CONSTANT, RMQ_CONFIG } from './constant';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ParticipantsModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  // await app.listen(PARTICIPANT_CONSTANT.PORT);
  // console.log(`Participants service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  await microservice.listen();
  console.log('Participants service is listening for messages from RabbitMQ');
}
bootstrap();
