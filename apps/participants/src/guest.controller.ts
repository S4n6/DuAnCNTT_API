import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GuestDto } from './dto/guest.dto';
import { GuestResponse } from './dto/guest.response';
import { GuestService } from './guest.service';
import { ObjectId } from 'mongoose';

@Controller('/api/guests/')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  async findAll(): Promise<GuestResponse> {
    return this.guestService.findAll();
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<GuestResponse> {
    return this.guestService.findByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<GuestResponse> {
    return this.guestService.findOne(id);
  }

  @Post()
  async create(@Body() guestDto: GuestDto): Promise<GuestResponse> {
    return this.guestService.create(guestDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() guestDto: GuestDto,
  ): Promise<GuestResponse> {
    return this.guestService.update(id, guestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId): Promise<GuestResponse> {
    return this.guestService.remove(id);
  }
}
