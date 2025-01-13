import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guest } from '../entity/guest.entity';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) {}

  async findAll(): Promise<Guest[]> {
    return this.guestRepository.find();
  }

  async findOne(id: string): Promise<Guest> {
    return this.guestRepository.findOne({ where: { id } });
  }

  async create(guest: Guest): Promise<Guest> {
    return this.guestRepository.save(guest);
  }

  async update(id: string, guest: Guest): Promise<Guest> {
    await this.guestRepository.update(id, guest);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.guestRepository.delete(id);
  }
}
