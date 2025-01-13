import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { Speaker } from '../entity/speaker.entity';

@Controller('/api/speakers/')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Get()
  async findAll(): Promise<Speaker[]> {
    return this.speakerService.findAll();
  }

  @Get('eventId/:eventId')
    async findAllByEventId(@Param('eventId') eventId: string): Promise<Speaker[]> {
        return this.speakerService.findAllByEventId(eventId);
    }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Speaker> {
    return this.speakerService.findOne(id);
  }

  @Post()
  async create(@Body() speaker: Speaker): Promise<Speaker> {
    return this.speakerService.create(speaker);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() speaker: Speaker,
  ): Promise<Speaker> {
    return this.speakerService.update(id, speaker);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.speakerService.remove(id);
  }
}
