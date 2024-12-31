import { Controller, Get, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResponseDto } from './event.response';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RequestCreateEventDto } from './event.request';

@Controller('/api/events/')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<EventResponseDto> {
    return await this.eventService.getAllEvents(page, limit);
  }

  @Get(':id')
  async getEventById(@Param() id: string): Promise<EventResponseDto> {
    return await this.eventService.getEventById(id);
  }

  @Post()
  async createEvent(
    @Body() createEventDto: RequestCreateEventDto,
  ): Promise<EventResponseDto> {
    return await this.eventService.createEvent(createEventDto);
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: RequestCreateEventDto,
  ): Promise<EventResponseDto> {
    return await this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<EventResponseDto> {
    return await this.eventService.deleteEvent(id);
  }
}
