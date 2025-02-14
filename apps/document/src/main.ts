import { NestFactory } from '@nestjs/core';
import { DocumentModule } from './document.module';
import { DOCUMENTS_CONSTANTS, RMQ_CONFIG } from './constants';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(DocumentModule);
  app.enableCors();
  // await app.listen(DOCUMENTS_CONSTANTS.PORT);
  // console.log(`Document service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  microservice.listen();
  console.log('Document service is listening for messages from RabbitMQ');
}
bootstrap();
