import { NestFactory } from '@nestjs/core';
import { ScheduleModule } from './schedule.module';
import { ValidationPipe } from '@nestjs/common';
import { SCHEDULE_CONSTANTS } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(ScheduleModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(SCHEDULE_CONSTANTS.PORT);
  console.log(`Schedule service is running on: ${await app.getUrl()}`);
}
bootstrap();
