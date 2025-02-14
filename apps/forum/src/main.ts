import { NestFactory } from '@nestjs/core';
import { ForumModule } from './forum.module';
import { FORUM_CONSTANTS, RMQ_CONFIG } from './const';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ForumModule);
  // await app.listen(FORUM_CONSTANTS.PORT);
  // console.log(`Forum service is running on: ${await app.getUrl()}`);

  const microservice = app.connectMicroservice<MicroserviceOptions>(RMQ_CONFIG);
  microservice.listen();
  console.log('Forum service is listening for messages from RabbitMQ');
}
bootstrap();
