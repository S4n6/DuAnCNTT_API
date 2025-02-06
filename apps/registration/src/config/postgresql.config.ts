import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { REGISTRATION_CONSTANT } from '../constant';
import { Registration } from '../entity/registration.entity';

export const postgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: REGISTRATION_CONSTANT.POSTGRES_URL,
  entities: [Registration],
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
