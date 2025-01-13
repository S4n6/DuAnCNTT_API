import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormPgConfig } from './orm.config';
import { TypeEventController } from './typeEvent/typeEvent.controller';
import { TypeEventService } from './typeEvent/typeEvent.service';
import { Event } from './entity/event.entity';
import { TypeEvent } from './entity/typeEvent.entity';
import { Location } from './entity/location.entity';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { Guest } from './entity/guest.entity';
import { Speaker } from './entity/speaker.entity';
import { GuestController } from './guest/guest.controller';
import { SpeakerController } from './speaker/speaker.controller';
import { GuestService } from './guest/guest.service';
import { SpeakerService } from './speaker/speaker.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormPgConfig),
    TypeOrmModule.forFeature([Event, TypeEvent, Location, Guest, Speaker]),
  ],
  controllers: [
    EventController,
    TypeEventController,
    LocationController,
    GuestController,
    SpeakerController,
  ],
  providers: [
    EventService,
    TypeEventService,
    LocationService,
    GuestService,
    SpeakerService,
  ],
})
export class EventModule {}
