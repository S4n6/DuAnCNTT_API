import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { Repository } from 'typeorm';
import {
  RegistrationRequestCancel,
  RegistrationRequestCreate,
} from './request/registration.request';
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
      const isRegistered = await this.checkRegistrationOfUser(
        data.userId,
        data.eventId,
      );
      if (isRegistered.success) {
        const registrationData = Array.isArray(isRegistered.data)
          ? isRegistered.data[0]
          : isRegistered.data;
        if (registrationData.registrationStatus === 'cancelled') {
          return this.reRegister(data.eventId, data.userId);
        }

        return new RegistrationResponse(
          false,
          'Registration already registered',
          isRegistered.data,
        );
      }

      const ticketPayload: TicketRequestCreate = {
        price: 250,
        seatNumber: 'A42',
        type: 'VIP',
        eventId: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
        status: 'using',
      };
      const ticket: TicketResponse =
        await this.ticketService.create(ticketPayload);
      if (!ticket.success) {
        return new RegistrationResponse(false, ticket.message, null);
      }

      const registration = this.registrationRepository.create({
        ...data,
        ticketId: Array.isArray(ticket.data)
          ? ticket.data[0].id
          : ticket.data.id,
      });

      await this.registrationRepository.save(registration);

      return new RegistrationResponse(
        true,
        'Registration created',
        registration,
      );
    } catch (error) {
      return new RegistrationResponse(false, error.message, null);
    }
  }

  async cancelRegistration(
    data: RegistrationRequestCancel,
  ): Promise<RegistrationResponse> {
    try {
      const registration = await this.registrationRepository.findOne({
        where: { eventId: data.eventId, userId: data.userId },
      });
      if (!registration) {
        return new RegistrationResponse(false, 'Registration not found', null);
      }

      const ticket: TicketResponse = await this.ticketService.update(
        data.ticketId,
        { status: 'cancelled' },
      );
      if (!ticket.success) {
        return new RegistrationResponse(false, ticket.message, null);
      }

      await this.registrationRepository.update(registration.id, {
        registrationStatus: 'cancelled',
      });

      return new RegistrationResponse(true, 'Registration cancelled', null);
    } catch (error) {
      return new RegistrationResponse(
        false,
        error.message || 'Failed to cancel registration',
        null,
      );
    }
  }

  async checkRegistrationOfUser(
    userId: string,
    enventId: string,
  ): Promise<RegistrationResponse> {
    try {
      const registration = await this.registrationRepository.findOne({
        where: { userId, eventId: enventId },
      });
      if (!registration) {
        return new RegistrationResponse(false, 'Registration not found', null);
      }
      return new RegistrationResponse(true, 'Registration found', registration);
    } catch (error) {
      return new RegistrationResponse(
        false,
        error.message || 'Failed to fetch registration',
        null,
      );
    }
  }

  async reRegister(eventId: string, userId: string) {
    try {
      const registration = await this.registrationRepository.findOne({
        where: { userId, eventId },
      });

      if (!registration) {
        return new RegistrationResponse(false, 'Registration not found', null);
      }

      const ticket: TicketResponse = await this.ticketService.update(
        registration.ticketId,
        { status: 'confirmed' },
      );

      if (!ticket.success) {
        return new RegistrationResponse(false, ticket.message, null);
      }

      await this.registrationRepository.update(registration.id, {
        registrationStatus: 'confirmed',
      });

      return new RegistrationResponse(true, 'Registration confirmed', {
        ...registration,
        registrationStatus: 'confirmed',
      });
    } catch (error) {
      return new RegistrationResponse(
        false,
        error.message || 'Failed to confirm registration',
        null,
      );
    }
  }
}
