import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventResponseDto } from './event.response';
import { Event } from './entity/event.entity';
import { RequestCreateEventDto } from './event.request';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getAllEvents(page: number, limit: number): Promise<EventResponseDto> {
    const [events, total] = await this.eventRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!events) {
      return new EventResponseDto(false, 'Events not found');
    }
    return new EventResponseDto(true, 'Events found', {
      events,
      page,
      total,
    });
  }

  async getEventsByIds(ids: string[]): Promise<EventResponseDto> {
    const events = await this.eventRepository.findByIds(ids);
    if (!events.length) {
      return new EventResponseDto(false, 'Events not found', { events: null });
    }
    return new EventResponseDto(true, 'Events found', { events });
  }

  async searchEvents(
    name?: string,
    startDate?: Date,
    endDate?: Date,
    locationId?: string,
    typeId?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<EventResponseDto> {
    const query = this.eventRepository.createQueryBuilder('event');

    if (name) {
      query.andWhere('event.name ILIKE :name', { name: `%${name}%` });
    }
    if (startDate) {
      query.andWhere('event.startDate >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('event.endDate <= :endDate', { endDate });
    }
    if (locationId) {
      query.andWhere('event.locationId = :locationId', { locationId });
    }
    if (typeId) {
      query.andWhere('event.typeId = :typeId', { typeId });
    }
    query.skip((page - 1) * limit).take(limit);

    const [events, total] = await query.getManyAndCount();
    if (!events.length) {
      return new EventResponseDto(false, 'No events found', { events: null });
    }
    return new EventResponseDto(true, 'Events found', { events, page, total });
  }

  async getEventById(id: string): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      return new EventResponseDto(false, 'Event not found');
    }
    return new EventResponseDto(true, 'Event found', {
      events: event,
    });
  }

  async getOwnEvents(
    userId: string,
    page: number,
    limit: number,
  ): Promise<EventResponseDto> {
    const [events, total] = await this.eventRepository.findAndCount({
      where: { ownerId: userId },
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!events.length) {
      return new EventResponseDto(false, 'No events found', { events: null });
    }
    return new EventResponseDto(true, 'Events found', { events, page, total });
  }

  async createEvent(event: RequestCreateEventDto): Promise<EventResponseDto> {
    try {
      const newEvent: Event = await this.eventRepository.save(event);
      return new EventResponseDto(true, 'Event created', {
        events: newEvent,
        page: 1,
        total: 1,
      });
    } catch (error) {
      return new EventResponseDto(false, 'Event creation failed');
    }
  }

  async updateEvent(
    id: string,
    event: RequestCreateEventDto,
  ): Promise<EventResponseDto> {
    const updateResult = await this.eventRepository.update(id, event);
    if (updateResult.affected === 0) {
      return new EventResponseDto(false, 'Event update failed');
    }
    const updatedEvent = await this.eventRepository.findOne({ where: { id } });
    return new EventResponseDto(true, 'Event updated', {
      events: updatedEvent,
    });
  }

  async deleteEvent(id: string): Promise<EventResponseDto> {
    const deleteResult = await this.eventRepository.delete(id);
    if (deleteResult.affected === 0) {
      return new EventResponseDto(false, 'Event delete failed');
    }
    return new EventResponseDto(true, 'Event deleted');
  }
}
