import { NestFactory } from '@nestjs/core';
import { ScheduleModule } from './schedule.module';
import { ValidationPipe } from '@nestjs/common';
import { RMQ_CONFIG, SCHEDULE_CONSTANTS } from './constant';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ScheduleModule);
  app.useGlobalPipes(new ValidationPipe());
  // await app.listen(SCHEDULE_CONSTANTS.PORT);
  // console.log(`Schedule service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  await microservice.listen();
  console.log('Schedule service is listening for messages from RabbitMQ');
}
bootstrap();
