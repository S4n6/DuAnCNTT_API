import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entity/location.entity';
import { LocationRequestDto } from './location.resquest';
import { LocationResponseDto } from './location.response';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(location: LocationRequestDto): Promise<LocationResponseDto> {
    const newLocation: Location = await this.locationRepository.save(location);
    if (!newLocation) {
      return {
        success: false,
        message: 'Location creation failed',
      };
    }
    return {
      success: true,
      message: 'Location created',
      data: newLocation,
    };
  }

  async findAll(): Promise<LocationResponseDto> {
    const locations: Location[] = await this.locationRepository.find();
    return {
      success: true,
      message: 'Locations found',
      data: locations,
    };
  }

  async findOne(id: string): Promise<LocationResponseDto> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      return {
        success: false,
        message: 'Location not found',
      };
    }
    return {
      success: true,
      message: 'Location found',
      data: location,
    };
  }

  async update(
    id: string,
    location: LocationRequestDto,
  ): Promise<LocationResponseDto> {
    const updatedLocation = await this.locationRepository.update(
      id,
      location as unknown as Location,
    );
    if (!updatedLocation) {
      return {
        success: false,
        message: 'Location update failed',
      };
    }
    return {
      success: true,
      message: 'Location updated',
    };
  }

  async remove(id: string): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Location not found');
    }
  }
}
