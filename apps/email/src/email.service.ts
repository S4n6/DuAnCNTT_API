import { Injectable } from '@nestjs/common';
import { EmailRequestNotify } from './email.request';
import { EmailResponse } from './email.response';
import * as nodemailer from 'nodemailer';
import { EMAIL_CONSTANT } from './constant';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

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

  private async compileTemplate(
    templateName: string,
    context: any,
  ): Promise<string> {
    const filePath = path.join(
      __dirname,
      '..',
      'templates',
      `${templateName}.hbs`,
    );
    const template = fs.readFileSync(filePath, 'utf8');
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(context);
  }

  async sendEmail(body: EmailRequestNotify): Promise<EmailResponse> {
    let html = body.templateHtml;
    if (body.templateHtml && body.templateHtml.endsWith('.hbs')) {
      html = await this.compileTemplate(
        body.templateHtml.replace('.hbs', ''),
        body,
      );
    }

    const mailOptions = {
      from: EMAIL_CONSTANT.EMAIL_CONFIG.auth.user,
      to: body.to,
      subject: body.subject,
      text: body.text,
      html,
    };

    try {
      console.log('Sending email...');
      await this.transporter.sendMail(mailOptions);
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
