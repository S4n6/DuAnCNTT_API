import { NestFactory } from '@nestjs/core';
import { ForumModule } from './forum.module';
import { FORUM_CONSTANTS } from './const';

async function bootstrap() {
  const app = await NestFactory.create(ForumModule);
  await app.listen(FORUM_CONSTANTS.PORT);
}
bootstrap();
