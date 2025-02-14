import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { PARTICIPANT_CONSTANT, RMQ_CONFIG } from './constant';
import { Participant, ParticipantSchema } from './schema/participant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot(PARTICIPANT_CONSTANT.MONGO_URL),
    MongooseModule.forFeature([
      { name: Participant.name, schema: ParticipantSchema },
    ]),
    HttpModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        ...RMQ_CONFIG,
      },
    ]),
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
