import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';
import { GuestController } from './guest.controller';
import { SpeakerController } from './speaker.controller';
import { GuestService } from './guest.service';
import { SpeakerService } from './speaker.service';
import { PARTICIPANT_CONSTANT } from './constant';
import { Guest, GuestSchema } from './schema/guest.schema';
import { Speaker, SpeakerSchema } from './schema/speaker.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(PARTICIPANT_CONSTANT.MONGO_URL),
    MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }]),
    MongooseModule.forFeature([{ name: Speaker.name, schema: SpeakerSchema }]),
  ],
  controllers: [ParticipantsController, GuestController, SpeakerController],
  providers: [ParticipantsService, GuestService, SpeakerService],
})
export class ParticipantsModule {}
