import { NotificationDto } from './notification.dto';

export class NotificationResponse {
  success: boolean;
  message: string;
  data: NotificationDto | NotificationDto[];

  constructor(
    success: boolean,
    message: string,
    data: NotificationDto | NotificationDto[],
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
