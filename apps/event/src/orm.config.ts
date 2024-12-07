import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EVENT_CONSTANTS } from './constants';
import { Event } from './entity/event.entity';
import { TypeEvent } from './entity/typeEvent.entity';
import { Location } from './entity/location.entity';

export const ormPgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: EVENT_CONSTANTS.POSTGRES_URL,
  entities: [Event, TypeEvent, Location],
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
