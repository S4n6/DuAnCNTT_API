import { NestFactory } from '@nestjs/core';
import { CheckInOutModule } from './check-in-out.module';

async function bootstrap() {
  const app = await NestFactory.create(CheckInOutModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
