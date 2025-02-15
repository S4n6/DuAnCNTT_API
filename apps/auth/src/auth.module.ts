import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS, jwtConstants, RMQ_CONFIG } from './constants';
import { PassportModule } from '@nestjs/passport';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.schema';
import { GoogleStrategy } from './strategy/google.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: jwtConstants.JWT_SECRET,
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [AUTH_CONSTANTS.RABBITMQ_URL],
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongooseModule.forRoot(AUTH_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
