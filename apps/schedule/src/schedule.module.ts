import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEDULE_CONSTANTS } from './constant';
import { ScheduleSchema } from './schedule.schema';

@Module({
  imports: [
    MongooseModule.forRoot(SCHEDULE_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
