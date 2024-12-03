import { NestFactory } from '@nestjs/core';
import { ParticipantsModule } from './participants.module';

async function bootstrap() {
  const app = await NestFactory.create(ParticipantsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
