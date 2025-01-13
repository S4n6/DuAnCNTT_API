
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

  @Post()
  async create(@Body() guest: Guest): Promise<Guest> {
    return this.guestService.create(guest);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() guest: Guest): Promise<Guest> {
    return this.guestService.update(id, guest);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.guestService.remove(id);
  }
}