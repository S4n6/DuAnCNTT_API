import { NotificationDto } from './notification.dto';

export class NotificationResponse {
  success: boolean;
  message: string;
  data: {
    notifications: NotificationDto | NotificationDto[];
    total: number;
    page: number;
  };

  constructor(
    success: boolean,
    message: string,
    data: {
      notifications: NotificationDto | NotificationDto[];
      total: number;
      page: number;
    },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
