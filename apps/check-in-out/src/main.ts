import { NestFactory } from '@nestjs/core';
import { CheckInOutModule } from './check-in-out.module';
import { CHECK_IN_OUT_CONSTANTS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(CheckInOutModule);
  await app.listen(CHECK_IN_OUT_CONSTANTS.PORT);
  console.log(`Check-in-out service is running on: ${await app.getUrl()}`);
}
bootstrap();
