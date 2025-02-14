import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQ_CONFIG, SCHEDULE_CONSTANTS } from './constant';
import { ScheduleSchema } from './schedule.schema';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot(SCHEDULE_CONSTANTS.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        ...RMQ_CONFIG,
      },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
