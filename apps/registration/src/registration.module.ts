import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from './config/rabbitmq.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { postgresConfig } from './config/postgresql.config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'event_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forRoot(postgresConfig),
    TypeOrmModule.forFeature([Registration]),
    HttpModule,
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService, HttpModule],
})
export class RegistrationModule {}
