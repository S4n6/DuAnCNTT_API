import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailRequestNotify } from './email.request';
import { EmailResponse } from './email.response';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern({ cmd: 'sendEmail' })
  async sendEmail(
    @Body() payload: { email: EmailRequestNotify },
  ): Promise<EmailResponse> {
    return this.emailService.sendEmail(payload.email);
  }
}
