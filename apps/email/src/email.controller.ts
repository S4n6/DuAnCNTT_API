import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailRequestNotify } from './email.request';
import { EmailResponse } from './email.response';

@Controller('/api/email/')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('notify')
  async sendEmail(
    @Body() payload: { email: EmailRequestNotify },
  ): Promise<EmailResponse> {
    return this.emailService.sendEmail(payload.email);
  }
}
