import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import * as dotenv from 'dotenv';
import { HttpModule } from '@nestjs/axios';
import { TokenDevice, TokenDeviceSchema } from './tokenDevice.schema';

dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TokenDevice.name, schema: TokenDeviceSchema }]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
