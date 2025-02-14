import { Controller, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResponseDto } from './event.response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RequestCreateEventDto } from './event.request';
import { Public } from 'lib/common/decorators/public.decorator';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern({ cmd: 'get_all_events' })
  async getAllEvents(
    @Payload() data: { page: number; limit: number },
  ): Promise<EventResponseDto> {
    console.log('getAllEvents::', data);
    const { page = 1, limit = 10 } = data;
    return await this.eventService.getAllEvents(page, limit);
  }

  @MessagePattern({ cmd: 'search_events' })
  async searchEvents(
    @Payload()
    data: {
      name?: string;
      startDate?: Date;
      endDate?: Date;
      locationId?: string;
      typeId?: string;
    },
  ): Promise<EventResponseDto> {
    const { name, startDate, endDate, locationId, typeId } = data;
    console.log('searchEvents::', name, startDate, endDate, locationId, typeId);
    return await this.eventService.searchEvents(
      name,
      startDate,
      endDate,
      locationId,
      typeId,
    );
  }

  @MessagePattern({ cmd: 'get_own_events' })
  async getOwnEvents(
    @Payload() data: { userId: string; page: number; limit: number },
  ): Promise<EventResponseDto> {
    const { userId, page = 1, limit = 10 } = data;
    return await this.eventService.getOwnEvents(userId, page, limit);
  }

  @MessagePattern({ cmd: 'get_event_by_id' })
  async getEventById(
    @Payload() data: { id: string },
  ): Promise<EventResponseDto> {
    return await this.eventService.getEventById(data.id);
  }

  @MessagePattern({ cmd: 'get_events_by_ids' })
  async getEventsByIds(
    @Payload() data: { ids: string[] },
  ): Promise<EventResponseDto> {
    console.log('getEventsByIds::', data.ids);
    return await this.eventService.getEventsByIds(data.ids);
  }

  @MessagePattern({ cmd: 'create_event' })
  async createEvent(
    @Payload() createEventDto: RequestCreateEventDto,
  ): Promise<EventResponseDto> {
    return await this.eventService.createEvent(createEventDto);
  }

  @MessagePattern({ cmd: 'update_event' })
  async updateEvent(
    @Payload() data: { id: string; updateEventDto: RequestCreateEventDto },
  ): Promise<EventResponseDto> {
    const { id, updateEventDto } = data;
    return await this.eventService.updateEvent(id, updateEventDto);
  }

  @MessagePattern({ cmd: 'delete_event' })
  async deleteEvent(
    @Payload() data: { id: string },
  ): Promise<EventResponseDto> {
    return await this.eventService.deleteEvent(data.id);
  }
}
