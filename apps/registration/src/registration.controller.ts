import { Controller, Get, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RegistrationRequestCreate } from './request/registration.request';
import { RegistrationResponse } from './response/registration.response';

@Controller('/api/registration/')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @EventPattern('registration_created')
  async createRegistration(@Payload() data: RegistrationRequestCreate): RegistrationResponse {
    return 'Register';
  }
}
