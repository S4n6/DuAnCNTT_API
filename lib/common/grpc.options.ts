// src/grpc.options.ts
import { Transport, ClientOptions } from '@nestjs/microservices';

export const grpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'api',
    protoPath: 'lib/common/api.proto',
  },
};
