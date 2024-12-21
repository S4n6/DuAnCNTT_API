import { Injectable } from '@nestjs/common';
import { EmailRequestNotify } from './email.request';
import { EmailResponse } from './email.response';
import * as nodemailer from 'nodemailer';
import { EMAIL_CONSTANT } from './constant';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: EMAIL_CONSTANT.EMAIL_CONFIG.auth,
    });
  }

  async sendEmail(body: EmailRequestNotify): Promise<EmailResponse> {
    try {
      console.log('Sending email...');
      await this.transporter.sendMail({
        from: EMAIL_CONSTANT.EMAIL_CONFIG.auth.user,
        to: body.to,
        subject: body.subject,
        text: body.text,
      });
      return {
        success: true,
        message: 'Email sent successfully',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'Failed to send email',
        data: null,
      };
    }
  }
}
