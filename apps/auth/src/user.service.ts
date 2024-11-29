import { Observable } from 'rxjs';
import { UserDto } from './user.dto';

export interface UserService {
  getUserById(data: { userId: string }): Observable<any>;
  getUserByEmail(data: { email: string }): Observable<any>;
  getUserByPhone(data: { phoneNumber: string }): Observable<any>;
  createUserByEmail(data: { user: UserDto }): Observable<any>;
}
