import { EMAIL_CONSTANT } from './constant';

export interface EmailRequest {
  to: string;
  subject: string;
  text: string;
  type: string;
}

export class EmailRequestNotify implements EmailRequest {
  to: string;
  subject: string;
  text: string;
  type = EMAIL_CONSTANT.EMAIL_TYPE.NOTIFY;

  constructor(to: string, subject: string, text: string) {
    this.to = to;
    this.subject = subject;
    this.text = text;
  }
}

export class EmailRequestSignUp implements EmailRequest {
  to: string;
  subject: string;
  text: string;
  type = EMAIL_CONSTANT.EMAIL_TYPE.SIGNUP;

  constructor(to: string, subject: string, text: string) {
    this.to = to;
    this.subject = subject;
    this.text = text;
  }
}
