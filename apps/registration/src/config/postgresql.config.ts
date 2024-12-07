import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { REGISTRATION_CONSTANT } from '../constant';
import { Ticket } from '../entity/ticket.entity';
import { Registration } from '../entity/registration.entity';

export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: REGISTRATION_CONSTANT.POSTGRES_URL,
  entities: [Ticket, Registration],
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
