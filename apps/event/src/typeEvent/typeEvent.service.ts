import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeEvent } from '../entity/typeEvent.entity';
import { TypeEventRequestDto } from './typeEvent.request';
import { TypeEventResponseDto } from './typeEvent.reponse';

@Injectable()
export class TypeEventService {
  constructor(
    @InjectRepository(TypeEvent)
    private readonly typeEventRepository: Repository<TypeEvent>,
  ) {}

  async create(typeEvent: TypeEventRequestDto): Promise<TypeEventResponseDto> {
    const newTypeEvent: TypeEvent =
      await this.typeEventRepository.save(typeEvent);
    if (!newTypeEvent) {
      return {
        success: false,
        message: 'TypeEvent creation failed',
      };
    }
    return {
      success: true,
      message: 'TypeEvent created',
      data: newTypeEvent,
    };
  }

  async findAll(): Promise<TypeEventResponseDto> {
    const typeEvents: TypeEvent[] = await this.typeEventRepository.find();
    return {
      success: true,
      message: 'TypeEvents found',
      data: typeEvents,
    };
  }

  async findOne(id: string): Promise<TypeEventResponseDto> {
    const typeEvent = await this.typeEventRepository.findOne({ where: { id } });
    if (!typeEvent) {
      return {
        success: false,
        message: 'TypeEvent not found',
      };
    }
    return {
      success: true,
      message: 'TypeEvent found',
      data: typeEvent,
    };
  }

  async update(
    id: string,
    typeEvent: TypeEventRequestDto,
  ): Promise<TypeEventResponseDto> {
    const updatedTypeEvent = await this.typeEventRepository.update(
      id,
      typeEvent as unknown as TypeEvent,
    );
    if (!updatedTypeEvent) {
      return {
        success: false,
        message: 'TypeEvent update failed',
      };
    }
    return {
      success: true,
      message: 'TypeEvent updated',
    };
  }

  async remove(id: string): Promise<void> {
    const result = await this.typeEventRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('TypeEvent not found');
    }
  }
}
