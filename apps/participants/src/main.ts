import { NestFactory } from '@nestjs/core';
import { ParticipantsModule } from './participants.module';
import { PARTICIPANT_CONSTANT } from './constant';

async function bootstrap() {
  const app = await NestFactory.create(ParticipantsModule);
  await app.listen(PARTICIPANT_CONSTANT.PORT);
}
bootstrap();
