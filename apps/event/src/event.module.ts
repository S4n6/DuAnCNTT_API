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
import { JwtStrategy } from 'lib/common/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormPgConfig),
    TypeOrmModule.forFeature([Event, TypeEvent]),
  ],
  controllers: [EventController, TypeEventController],
  providers: [EventService, TypeEventService, JwtStrategy],
})
export class EventModule {}
