import { EMAIL_CONSTANT } from './constant';

export interface EmailRequest {
  to: string;
  subject: string;
  text?: string;
  type: string;
  templateHtml?: string;
}

export class EmailRequestNotify implements EmailRequest {
  to: string;
  subject: string;
  text?: string;
  type = EMAIL_CONSTANT.EMAIL_TYPE.NOTIFY;
  templateHtml?: string;

  constructor(
    to: string,
    subject: string,
    text?: string,
    templateHtml?: string,
  ) {
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.templateHtml = templateHtml;
  }
}

export class EmailRequestSignUp implements EmailRequest {
  to: string;
  subject: string;
  text?: string;
  type = EMAIL_CONSTANT.EMAIL_TYPE.SIGNUP;
  templateHtml?: string;

  constructor(
    to: string,
    subject: string,
    text?: string,
    templateHtml?: string,
  ) {
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.templateHtml = templateHtml;
  }
}
