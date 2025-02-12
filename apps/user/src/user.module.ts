import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { HttpModule } from '@nestjs/axios';
import { TokenDevice, TokenDeviceSchema } from './tokenDevice.schema';
import { USER_CONSTANTS } from './constant';
import { JwtStrategy } from 'lib/common/auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(USER_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: TokenDevice.name, schema: TokenDeviceSchema },
    ]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
