import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { GuestDto } from './dto/guest.dto';
import { GuestResponse } from './dto/guest.response';
import { Guest } from './schema/guest.schema';
@Injectable()
export class GuestService {
  constructor(
    @InjectModel(Guest.name) private readonly guestModel: Model<Guest>,
  ) {}

  async findAll(): Promise<GuestResponse> {
    try {
      const guests: GuestDto[] = await this.guestModel.find();
      return new GuestResponse(true, 'Guests found', guests);
    } catch (error) {
      return new GuestResponse(false, error?.message, []);
    }
  }

  async findOne(id: ObjectId): Promise<GuestResponse> {
    try {
      const guest: GuestDto = await this.guestModel.findById(id);
      if (!guest) {
        return new GuestResponse(false, `Guest with ID ${id} not found`, []);
      }
      return new GuestResponse(true, 'Guest found', guest);
    } catch (error) {
      return new GuestResponse(false, error?.message, []);
    }
  }

  async create(guestDto: GuestDto): Promise<GuestResponse> {
    try {
      const newGuest = new this.guestModel(guestDto);
      const savedGuest = await newGuest.save();
      return new GuestResponse(true, 'Guest created successfully', null);
    } catch (error) {
      return new GuestResponse(false, error?.message, null);
    }
  }

  async update(id: ObjectId, guestDto: GuestDto): Promise<GuestResponse> {
    try {
      const updatedGuest: GuestDto = await this.guestModel.findByIdAndUpdate(
        id,
        guestDto,
        {
          new: true,
        },
      );
      if (!updatedGuest) {
        return new GuestResponse(false, `Guest with ID ${id} not found`, null);
      }
      return new GuestResponse(
        true,
        'Guest updated successfully',
        updatedGuest,
      );
    } catch (error) {
      return new GuestResponse(false, error?.message, null);
    }
  }

  async remove(id: ObjectId): Promise<GuestResponse> {
    try {
      const deletedGuest: GuestDto =
        await this.guestModel.findByIdAndDelete(id);
      if (!deletedGuest) {
        return new GuestResponse(false, `Guest with ID ${id} not found`, null);
      }
      return new GuestResponse(
        true,
        'Guest removed successfully',
        deletedGuest,
      );
    } catch (error) {
      return new GuestResponse(false, error?.message, null);
    }
  }
}
