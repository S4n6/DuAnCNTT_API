import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { Repository } from 'typeorm';
import { RegistrationRequestCreate } from './request/registration.request';
import { TicketService } from './ticket/ticket.service';
import { TicketRequestCreate } from './request/ticket.request';
import { TicketResponse } from './response/ticket.response';
import { RegistrationResponse } from './response/registration.response';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    private readonly ticketService: TicketService,
  ) {}

  async createRegistration(
    data: RegistrationRequestCreate,
  ): Promise<RegistrationResponse> {
    try {
      const ticketPayload: TicketRequestCreate = {
        price: 250,
        seatNumber: 'A42',
        type: 'VIP',
        eventId: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
      };
      const ticket: TicketResponse =
        await this.ticketService.create(ticketPayload);
      if (!ticket.success) {
        return {
          success: false,
          message: ticket?.message,
          data: null,
        };
      }

      const registration = this.registrationRepository.create({
        ...data,
        ticketId: Array.isArray(ticket.data)
          ? ticket.data[0].id
          : ticket.data.id,
      });

      await this.registrationRepository.save(registration);

      return {
        success: true,
        message: 'Registration created',
        data: registration,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create registration',
        data: null,
      };
    }
  }
}
