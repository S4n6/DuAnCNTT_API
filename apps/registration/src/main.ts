import { NestFactory } from '@nestjs/core';
import { RegistrationModule } from './registration.module';
import { REGISTRATION_CONSTANT } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(RegistrationModule);
  await app.listen(REGISTRATION_CONSTANT.PORT);
}
bootstrap();
