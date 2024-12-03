import { LocationRequestDto } from './location.resquest';
import { LocationService } from './location.service';

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('/api/locations/')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body() createLocationDto: LocationRequestDto) {
    return await this.locationService.create(createLocationDto);
  }

  @Get()
  async findAll() {
    return await this.locationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.locationService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: LocationRequestDto,
  ) {
    return await this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.locationService.remove(id);
  }
}
