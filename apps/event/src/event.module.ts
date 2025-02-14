import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormPgConfig } from './orm.config';
import { TypeEventController } from './typeEvent/typeEvent.controller';
import { TypeEventService } from './typeEvent/typeEvent.service';
import { Event } from './entity/event.entity';
import { TypeEvent } from './entity/typeEvent.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EVENT_CONSTANTS } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormPgConfig),
    TypeOrmModule.forFeature([Event, TypeEvent]),
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [EVENT_CONSTANTS.RABBITMQ_URL],
          queue: 'event_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [EventController, TypeEventController],
  providers: [EventService, TypeEventService],
})
export class EventModule {}
