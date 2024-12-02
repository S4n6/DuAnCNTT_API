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

  async getAllEvents(): Promise<EventResponseDto> {
    const events: Event[] = await this.eventRepository.find();
    if (!events) {
      return {
        success: false,
        message: 'Events not found',
      };
    }
    return {
      success: true,
      message: 'Events found',
      data: events,
    };
  }

  async getEventById(id: string): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      return {
        success: false,
        message: 'Event not found',
      };
    }
    return {
      success: true,
      message: 'Event found',
      data: event,
    };
  }

  async createEvent(event: RequestCreateEventDto): Promise<EventResponseDto> {
    try {
      const newEvent = await this.eventRepository.save(event);
      return {
        success: true,
        message: 'Event created',
        data: newEvent,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Event creation failed',
      };
    }
  }

  async updateEvent(
    id: string,
    event: RequestCreateEventDto,
  ): Promise<EventResponseDto> {
    const updateResult = await this.eventRepository.update(id, event);
    if (updateResult.affected === 0) {
      return {
        success: false,
        message: 'Event update failed',
      };
    }
    const updatedEvent = await this.eventRepository.findOne({ where: { id } });
    return {
      success: true,
      message: 'Event updated',
      data: updatedEvent,
    };
  }

  async deleteEvent(id: string): Promise<EventResponseDto> {
    const deleteResult = await this.eventRepository.delete(id);
    if (deleteResult.affected === 0) {
      return {
        success: false,
        message: 'Event delete failed',
      };
    }
    return {
      success: true,
      message: 'Event deleted',
    };
  }
}
