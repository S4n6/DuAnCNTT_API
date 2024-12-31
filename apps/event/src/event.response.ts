import { Event } from './entity/event.entity';

export class EventResponseDto {
  success: boolean;
  message: string;
  data?: {
    events: Event | Event[];
    page?: number;
    total?: number;
  };

  constructor(
    success: boolean,
    message: string,
    data?: { events: Event | Event[]; page?: number; total?: number },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
