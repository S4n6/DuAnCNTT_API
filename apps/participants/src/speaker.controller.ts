import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SpeakerDto } from './dto/speaker.dto';
import { SpeakerService } from './speaker.service';
import { ObjectId } from 'mongoose';
import { SpeakerResponse } from './dto/speaker.response';

@Controller('/api/speakers/')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Get()
  async findAll(): Promise<SpeakerResponse> {
    return this.speakerService.findAll();
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<SpeakerResponse> {
    return this.speakerService.findByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<SpeakerResponse> {
    return this.speakerService.findOne(id);
  }

  @Post()
  async create(@Body() speakerDto: SpeakerDto): Promise<SpeakerResponse> {
    return this.speakerService.create(speakerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() speakerDto: SpeakerDto,
  ): Promise<SpeakerResponse> {
    return this.speakerService.update(id, speakerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId): Promise<SpeakerResponse> {
    return this.speakerService.remove(id);
  }
}
