import { Event } from './entity/event.entity';

export class EventResponseDto {
  success: boolean;
  message: string;
  data?: Event | Event[];
}
