
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest } from '../entity/guest.entity';

@Controller('/api/guests/')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  async findAll(): Promise<Guest[]> {
    return this.guestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Guest> {
    return this.guestService.findOne(id);
  }

  @Get('eventId/:eventId')
  async findAllByEventId(@Param('eventId') eventId: string): Promise<Guest[]> {
    return this.guestService.findAllByEventId(eventId);
  }

  @Get('userId/:userId')
  async findAllByUserId(@Param('userId') userId: string): Promise<Guest[]> {
    return this.guestService.findAllByUserId(userId);
  }

  @Post()
  async create(@Body() guest: Guest): Promise<Guest> {
    return this.guestService.create(guest);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() guest: Guest): Promise<Guest> {
    return this.guestService.update(id, guest);
  }

  @Delete('eventId/:eventId/userId/:userId')
  async removeByEventIdAndUserId(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.guestService.removeByEventIdAndUserId(eventId, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.guestService.remove(id);
  }
}