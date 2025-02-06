import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { Repository } from 'typeorm';
import {
  RegistrationRequestCancel,
  RegistrationRequestCreate,
} from './request/registration.request';
import { RegistrationResponse } from './response/registration.response';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    private readonly httpService: HttpService,
  ) {}

  async getRegistrationsByUserId(
    userId: string,
  ): Promise<RegistrationResponse> {
    try {
      const registrations = await this.registrationRepository.find({
        where: { userId },
      });
      if (!registrations) {
        return new RegistrationResponse(false, 'Registrations not found', null);
      }

      const eventIds = registrations.map((reg) => reg.eventId);
      const eventsResponse = await this.httpService
        .post('http://localhost:3002/api/events/ids', { ids: eventIds })
        .toPromise();

      const events = eventsResponse.data.data.events;

      console.log('events', events);

      const registrationsWithEvents = registrations.map((reg) => ({
        ...reg,
        event: events.find((event) => event.id === reg.eventId),
      }));

      return new RegistrationResponse(
        true,
        'Registrations found',
        registrationsWithEvents,
      );
    } catch (error) {
      return new RegistrationResponse(
        false,
        error.message || 'Failed to fetch registrations',
        null,
      );
    }
  }

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
        if (registrationData.registrationStatus === false) {
          return this.reRegister(data.eventId, data.userId);
        }

        return new RegistrationResponse(
          false,
          'Registration already registered',
          isRegistered.data,
        );
      }
     
      const registration = this.registrationRepository.create({
        ...data,
        registrationStatus: true,
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

      await this.registrationRepository.update(registration.id, {
        registrationStatus: false,
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

      await this.registrationRepository.update(registration.id, {
        registrationStatus: true,
      });

      return new RegistrationResponse(true, 'Registration confirmed', {
        ...registration,
        registrationStatus: true,
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
