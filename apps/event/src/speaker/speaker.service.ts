import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from '../entity/speaker.entity';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker)
    private readonly speakerRepository: Repository<Speaker>,
  ) {}

  async findAll(): Promise<Speaker[]> {
    return this.speakerRepository.find();
  }

  async findAllByEventId(eventId: string): Promise<Speaker[]> {
    return this.speakerRepository.find({ where: { eventId } });
  }

  async findOne(id: string): Promise<Speaker> {
    return this.speakerRepository.findOne({ where: { id } });
  }

  async create(speaker: Speaker): Promise<Speaker> {
    return this.speakerRepository.save(speaker);
  }

  async update(id: string, speaker: Speaker): Promise<Speaker> {
    await this.speakerRepository.update(id, speaker);
    return this.findOne(id);
  }

  async cancel(payload: { userId: string; eventId: string }): Promise<Speaker> {
    const speaker = await this.speakerRepository.findOne({
      where: { userId: payload.userId, eventId: payload.eventId },
    });
    speaker.isAccepted = 'canceled';
    return this.speakerRepository.save(speaker);
  }

  async accept(payload: { userId: string; eventId: string }): Promise<Speaker> {
    const speaker = await this.speakerRepository.findOne({
      where: { userId: payload.userId, eventId: payload.eventId },
    });
    speaker.isAccepted = 'accepted';
    return this.speakerRepository.save(speaker);
  }

  async remove(id: string): Promise<void> {
    await this.speakerRepository.delete(id);
  }
}
