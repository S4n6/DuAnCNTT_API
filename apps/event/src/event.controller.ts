import {
  Controller,
  Get,
  Query,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventResponseDto } from './event.response';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RequestCreateEventDto } from './event.request';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';
import { Public } from 'lib/common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('/api/events/')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Public()
  @Get()
  async getAllEvents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<EventResponseDto> {
    return await this.eventService.getAllEvents(page, limit);
  }

  @Get('search')
  async searchEvents(
    @Response() res,
    @Query('name') name?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('locationId') locationId?: string,
    @Query('typeId') typeId?: string,
  ): Promise<EventResponseDto> {
    console.log('searchEvents::', name, startDate, endDate, locationId, typeId);
    const response = await this.eventService.searchEvents(
      name,
      startDate,
      endDate,
      locationId,
      typeId,
    );
    if (response.data.events === null) {
      return res.status(404).send(response);
    }
    return res.status(200).send(response);
  }

  @Get('own/:userId')
  async getOwnEvents(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<EventResponseDto> {
    return await this.eventService.getOwnEvents(userId, page, limit);
  }

  @Get(':id')
  async getEventById(
    @Param() payload: { id: string },
  ): Promise<EventResponseDto> {
    return await this.eventService.getEventById(payload.id);
  }

  @Post('ids')
  async getEventsByIds(
    @Body() payload: { ids: string[] },
  ): Promise<EventResponseDto> {
    console.log('getEventsByIds::', payload.ids);
    return await this.eventService.getEventsByIds(payload.ids);
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
