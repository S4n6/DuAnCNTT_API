import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { HttpModule } from '@nestjs/axios';
import { TokenDevice, TokenDeviceSchema } from './tokenDevice.schema';
import { RMQ_CONFIG, USER_CONSTANTS } from './constant';
import { JwtStrategy } from 'lib/common/auth/jwt.strategy';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot(USER_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: TokenDevice.name, schema: TokenDeviceSchema },
    ]),
    HttpModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        ...RMQ_CONFIG,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
