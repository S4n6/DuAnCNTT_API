import {
  Controller,
  Get,
  Query,
  Res,
  Response,
  Inject,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestCreateEventDto } from 'apps/event/src/event.request';
import { EventResponseDto } from 'apps/event/src/event.response';

@Controller('/api/events/')
export class EventController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventServiceClient: ClientProxy,
  ) {}

  @Get()
  async getAllEvents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<EventResponseDto> {
    console.log('getAllEvents::', page, limit);
    return this.eventServiceClient
      .send({ cmd: 'get_all_events' }, { page, limit })
      .toPromise();
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
    const response = await this.eventServiceClient
      .send(
        { cmd: 'search_events' },
        { name, startDate, endDate, locationId, typeId },
      )
      .toPromise();
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
    return this.eventServiceClient
      .send({ cmd: 'get_own_events' }, { userId, page, limit })
      .toPromise();
  }

  @Get(':id')
  async getEventById(
    @Param() payload: { id: string },
  ): Promise<EventResponseDto> {
    return this.eventServiceClient
      .send({ cmd: 'get_event_by_id' }, payload)
      .toPromise();
  }

  @Post('ids')
  async getEventsByIds(
    @Body() payload: { ids: string[] },
  ): Promise<EventResponseDto> {
    console.log('getEventsByIds::', payload.ids);
    return this.eventServiceClient
      .send({ cmd: 'get_events_by_ids' }, payload)
      .toPromise();
  }

  @Post()
  async createEvent(
    @Body() createEventDto: RequestCreateEventDto,
  ): Promise<EventResponseDto> {
    return this.eventServiceClient
      .send({ cmd: 'create_event' }, createEventDto)
      .toPromise();
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: RequestCreateEventDto,
  ): Promise<EventResponseDto> {
    return this.eventServiceClient
      .send({ cmd: 'update_event' }, { id, updateEventDto })
      .toPromise();
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<EventResponseDto> {
    return this.eventServiceClient
      .send({ cmd: 'delete_event' }, { id })
      .toPromise();
  }
}
