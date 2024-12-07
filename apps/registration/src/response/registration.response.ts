import { Registration } from '../entity/registration.entity';

export class RegistrationResponse {
  success: boolean;
  message: string;
  data: Registration | Registration[];
}
