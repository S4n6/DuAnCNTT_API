import { Module } from '@nestjs/common';
import { CheckInOutController } from './check-in-out.controller';
import { CheckInOutService } from './check-in-out.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CHECK_IN_OUT_CONSTANTS } from './constants';
import { CheckInOut, CheckInOutSchema } from './check-in-out.schema';
import { CheckInOutGateway } from './check-in-out.gateway';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot(CHECK_IN_OUT_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([
      { name: CheckInOut.name, schema: CheckInOutSchema },
    ]),
    HttpModule,
  ],
  controllers: [CheckInOutController],
  providers: [CheckInOutService, CheckInOutGateway],
})
export class CheckInOutModule {}
