import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TypeEventService } from './typeEvent.service';
import { TypeEventRequestDto } from './typeEvent.request';

@Controller('/api/typeEvents/')
export class TypeEventController {
  constructor(private readonly typeEventService: TypeEventService) {}

  @Post()
  async create(@Body() createTypeEventDto: TypeEventRequestDto) {
    return await this.typeEventService.create(createTypeEventDto);
  }

  @Get()
  async findAll() {
    return await this.typeEventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.typeEventService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTypeEventDto: TypeEventRequestDto,
  ) {
    return await this.typeEventService.update(id, updateTypeEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.typeEventService.remove(id);
  }
}
