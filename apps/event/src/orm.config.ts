import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EVENT_CONSTANTS } from './constants';
import { Event } from './entity/event.entity';
import { TypeEvent } from './entity/typeEvent.entity';
import { Location } from './entity/location.entity';

export const ormPgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: EVENT_CONSTANTS.POSTGRES_URL,
  // host: EVENT_CONSTANTS.POSTGRES_HOST,
  // port: parseInt(EVENT_CONSTANTS.POSTGRES_PORT),
  // username: EVENT_CONSTANTS.POSTGRES_USERNAME,
  // password: EVENT_CONSTANTS.POSTGRES_PASSWORD,
  // database: EVENT_CONSTANTS.POSTGRES_DATABASE,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [Event, TypeEvent, Location],
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    ssl: {
      rejectUnauthorized: false, // This is for self-signed certificates. Adjust as needed.
    },
  },
};
