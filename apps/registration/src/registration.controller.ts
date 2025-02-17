import { Controller } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  RegistrationRequestCancel,
  RegistrationRequestCreate,
} from './request/registration.request';
import { RegistrationResponse } from './response/registration.response';

@Controller()
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @EventPattern({ cmd: 'is_registered' })
  async isRegistered(
    @Payload() data: { eventId: string; userId: string },
  ): Promise<RegistrationResponse> {
    const { eventId, userId } = data;
    console.log('isRegistered::', eventId, userId);
    return this.registrationService.checkRegistrationOfUser(userId, eventId);
  }

  @EventPattern({ cmd: 'get_registrations' })
  async getRegistrations(
    @Payload() data: { userId: string },
  ): Promise<RegistrationResponse> {
    const { userId } = data;
    console.log('getRegistrations::', userId);
    return this.registrationService.getRegistrationsByUserId(userId);
  }

  @EventPattern({ cmd: 'create_registration' })
  async createRegistration(
    @Payload() data: RegistrationRequestCreate,
  ): Promise<RegistrationResponse> {
    console.log('createRegistration::', data);
    return this.registrationService.createRegistration(data);
  }

  @EventPattern({ cmd: 'cancel_registration' })
  async cancelRegistration(
    @Payload() data: RegistrationRequestCancel,
  ): Promise<RegistrationResponse> {
    return this.registrationService.cancelRegistration(data);
  }
}
