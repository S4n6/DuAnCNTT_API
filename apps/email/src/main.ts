import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { EMAIL_CONSTANT } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  await app.listen(EMAIL_CONSTANT.PORT);
  console.log(`Email service is running on: ${await app.getUrl()}`);
}
bootstrap();
