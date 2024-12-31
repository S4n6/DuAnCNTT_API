import { Observable } from 'rxjs';
import { UserDto } from './user.dto';

export interface UserService {
  validateUserByEmail(data: {
    email: string;
    password: string;
  }): Observable<any>;

  validateUserByPhoneNumber(data: {
    phoneNumber: string;
    password: string;
  }): Observable<any>;
}
