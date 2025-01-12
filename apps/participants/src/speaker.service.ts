import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { SpeakerDto } from './dto/speaker.dto';
import { SpeakerResponse } from './dto/speaker.response';
import { Speaker } from './schema/speaker.schema';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectModel(Speaker.name) private readonly speakerModel: Model<Speaker>,
  ) {}

  async findAll(): Promise<SpeakerResponse> {
    try {
      const speakers: SpeakerDto[] = await this.speakerModel.find();
      return new SpeakerResponse(true, 'Speakers found', speakers);
    } catch (error) {
      return new SpeakerResponse(false, error?.message, []);
    }
  }

  async findByName(name: string): Promise<SpeakerResponse> {
    try {
      const speakers: SpeakerDto[] = await this.speakerModel.find({ name });
      if (speakers.length === 0) {
        return new SpeakerResponse(
          false,
          `Speaker with name ${name} not found`,
          [],
        );
      }
      return new SpeakerResponse(true, 'Speakers found', speakers);
    } catch (error) {
      return new SpeakerResponse(false, error?.message, []);
    }
  }

  async findOne(id: ObjectId): Promise<SpeakerResponse> {
    try {
      const speaker: SpeakerDto = await this.speakerModel.findById(id);
      if (!speaker) {
        return new SpeakerResponse(
          false,
          `Speaker with ID ${id} not found`,
          [],
        );
      }
      return new SpeakerResponse(true, 'Speaker found', speaker);
    } catch (error) {
      return new SpeakerResponse(false, error?.message, []);
    }
  }

  async create(speakerDto: SpeakerDto): Promise<SpeakerResponse> {
    try {
      const newSpeaker = new this.speakerModel(speakerDto);
      const speaker = await newSpeaker.save();

      return new SpeakerResponse(true, 'Speaker created successfully', null);
    } catch (error) {
      return new SpeakerResponse(false, error?.message, null);
    }
  }

  async update(id: ObjectId, speakerDto: SpeakerDto): Promise<SpeakerResponse> {
    try {
      const updatedSpeaker: SpeakerDto =
        await this.speakerModel.findByIdAndUpdate(id, speakerDto, {
          new: true,
        });
      if (!updatedSpeaker) {
        return new SpeakerResponse(
          false,
          `Speaker with ID ${id} not found`,
          null,
        );
      }
      return new SpeakerResponse(
        true,
        'Speaker updated successfully',
        updatedSpeaker,
      );
    } catch (error) {
      return new SpeakerResponse(false, error?.message, null);
    }
  }

  async remove(id: ObjectId): Promise<SpeakerResponse> {
    try {
      const deletedSpeaker: SpeakerDto =
        await this.speakerModel.findByIdAndDelete(id);
      if (!deletedSpeaker) {
        return new SpeakerResponse(
          false,
          `Speaker with ID ${id} not found`,
          null,
        );
      }
      return new SpeakerResponse(
        true,
        'Speaker removed successfully',
        deletedSpeaker,
      );
    } catch (error) {
      return new SpeakerResponse(false, error?.message, null);
    }
  }
}
