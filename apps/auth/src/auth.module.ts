import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS, jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.schema';

dotenv.config();

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: 'lib/common/user.proto',
    url: AUTH_CONSTANTS.GRPC_HOST_USER_SERVICE,
  },
};

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.JWT_SECRET,
    }),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
