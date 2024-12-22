import { NestFactory } from '@nestjs/core';
import { ScheduleModule } from './schedule.module';
import { SCHEDULE_CONSTANTS } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(ScheduleModule);
  await app.listen(SCHEDULE_CONSTANTS.PORT);
}
bootstrap();
