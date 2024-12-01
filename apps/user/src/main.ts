import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport, ClientOptions } from '@nestjs/microservices';

const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: 'lib/common/user.proto',
    url: 'localhost:5001',
  },
};

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.setGlobalPrefix('/api/users/');
  await app.listen(3001);

  const microservice = await NestFactory.createMicroservice(
    UserModule,
    grpcOptions,
  );
  await microservice.listen();
}
bootstrap();
