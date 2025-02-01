import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EVENT_CONSTANTS } from './constants';
import { Event } from './entity/event.entity';
import { TypeEvent } from './entity/typeEvent.entity';
import { Location } from './entity/location.entity';
import { Guest } from './entity/guest.entity';
import { Speaker } from './entity/speaker.entity';

export const ormPgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: EVENT_CONSTANTS.POSTGRES_URL,
  entities: [Event, TypeEvent, Location, Guest, Speaker],
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
