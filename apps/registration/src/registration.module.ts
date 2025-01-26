import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from './config/rabbitmq.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { Ticket } from './entity/ticket.entity';
import { postgresConfig } from './config/postgresql.config';
import { TicketService } from './ticket/ticket.service';
import { TicketController } from './ticket/ticket.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REGISTRATION_SERVICE',
        transport: Transport.RMQ,
        options: rabbitmqConfig.options,
      },
    ]),
    TypeOrmModule.forRoot(postgresConfig),
    TypeOrmModule.forFeature([Registration, Ticket]),
    HttpModule,
  ],
  controllers: [RegistrationController, TicketController],
  providers: [RegistrationService, TicketService],
})
export class RegistrationModule {}
