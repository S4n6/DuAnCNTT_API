import { Registration } from '../entity/registration.entity';

export class RegistrationResponse {
  success: boolean;
  message: string;
  data: Registration | Registration[];

  constructor(
    success: boolean,
    message: string,
    data: Registration | Registration[],
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
