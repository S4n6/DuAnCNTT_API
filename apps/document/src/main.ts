import { NestFactory } from '@nestjs/core';
import { DocumentModule } from './document.module';
import { DOCUMENTS_CONSTANTS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(DocumentModule);
  app.enableCors();
  await app.listen(DOCUMENTS_CONSTANTS.PORT);
  console.log(`Document service is running on: ${await app.getUrl()}`);
}
bootstrap();
