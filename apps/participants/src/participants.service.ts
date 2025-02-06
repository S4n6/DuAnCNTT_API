import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant } from './schema/participant.schema';
import { ParticipantResponse } from './dto/participant.response';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name)
    private readonly participantModel: Model<Participant>,
    private readonly httpService: HttpService,
  ) {}

  async create(participant: Participant): Promise<ParticipantResponse> {
    const newParticipant = new this.participantModel(participant);
    const savedParticipant = await newParticipant.save();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participant created successfully',
      data: {
        participants: savedParticipant,
        page: 1,
        total: 1,
      },
    };
    return response;
  }

  async findAll(): Promise<ParticipantResponse> {
    const participants = await this.participantModel.find().exec();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participants retrieved successfully',
      data: {
        participants,
        page: 1,
        total: participants.length,
      },
    };
    return response;
  }

  async findAllByEventId(eventId: string): Promise<object> {
    const participants = await this.participantModel.find({ eventId }).exec();
    const userIds = participants.map((participant) => participant.userId);
    const senderIds = participants.map((participant) => participant.senderId);

    const userResponses = await Promise.all(
      userIds.map((userId) =>
        this.httpService
          .get(`http://localhost:3001/api/users/${userId}`)
          .toPromise(),
      ),
    );

    const senderResponses = await Promise.all(
      senderIds.map((senderId) =>
        this.httpService
          .get(`http://localhost:3001/api/users/${senderId}`)
          .toPromise(),
      ),
    );

    console.log('userResponses', userResponses[0].data);
    console.log('senderResponses', senderResponses[0].data);

    const participantsWithUserInfo = participants.map((participant, index) => ({
      ...participant.toObject(),
      receiverInfo: {
        fullName: userResponses[index].data.data.users.fullName,
        avatar: userResponses[index].data.data.users.avatar,
      },
      senderInfo: {
        fullName: senderResponses[index].data.data.users.fullName,
        avatar: senderResponses[index].data.data.users.avatar,
      },
    }));

    const response = {
      success: true,
      message: 'Participants retrieved successfully',
      data: {
        participants: participantsWithUserInfo,
        page: 1,
        total: participants.length,
      },
    };
    return response;
  }

  async search(
    eventName: string,
    userId: string,
    page: number,
    limit: number,
  ): Promise<ParticipantResponse> {
    const participants = await this.participantModel
      .find({ eventName: { $regex: eventName, $options: 'i' }, userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participants retrieved successfully',
      data: {
        participants,
        page,
        total: participants.length,
      },
    };
    return response;
  }

  async findAllByUserId(userId: string): Promise<ParticipantResponse> {
    const participants = await this.participantModel.find({ userId }).exec();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participants retrieved successfully',
      data: {
        participants,
        page: 1,
        total: participants.length,
      },
    };
    return response;
  }

  async findOne(id: string): Promise<ParticipantResponse> {
    const participant = await this.participantModel.findById(id).exec();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participant retrieved successfully',
      data: {
        participants: participant,
        page: 1,
        total: 1,
      },
    };
    return response;
  }

  async update(
    id: string,
    participant: Participant,
  ): Promise<ParticipantResponse> {
    const updatedParticipant = await this.participantModel
      .findByIdAndUpdate(id, participant, { new: true })
      .exec();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participant updated successfully',
      data: {
        participants: updatedParticipant,
        page: 1,
        total: 1,
      },
    };
    return response;
  }

  async remove(id: string): Promise<ParticipantResponse> {
    await this.participantModel.deleteOne({ _id: id }).exec();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participant removed successfully',
      data: {
        participants: null,
        page: 1,
        total: 0,
      },
    };
    return response;
  }

  async removeByEventIdAndUserId(
    eventId: string,
    userId: string,
  ): Promise<ParticipantResponse> {
    await this.participantModel.deleteOne({ eventId, userId }).exec();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participant removed successfully',
      data: {
        participants: null,
        page: 1,
        total: 0,
      },
    };
    return response;
  }

  async reject(payload: {
    userId: string;
    eventId: string;
  }): Promise<ParticipantResponse> {
    const participant = await this.participantModel.findOne({
      userId: payload.userId,
      eventId: payload.eventId,
    });
    participant.status = 'rejected';
    const savedParticipant = await participant.save();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participant rejected successfully',
      data: {
        participants: savedParticipant,
        page: 1,
        total: 1,
      },
    };
    return response;
  }

  async accept(payload: {
    userId: string;
    eventId: string;
  }): Promise<ParticipantResponse> {
    const participant = await this.participantModel.findOne({
      userId: payload.userId,
      eventId: payload.eventId,
    });
    participant.status = 'accepted';
    const savedParticipant = await participant.save();
    const response: ParticipantResponse = {
      success: true,
      message: 'Participant accepted successfully',
      data: {
        participants: savedParticipant,
        page: 1,
        total: 1,
      },
    };
    return response;
  }

  async cancel(payload: {
    userId: string;
    eventId: string;
  }): Promise<ParticipantResponse> {
    const result = await this.participantModel.deleteOne({
      userId: payload.userId,
      eventId: payload.eventId,
    });

    if (result.deletedCount === 0) {
      throw new Error('Participant not found');
    }

    const response: ParticipantResponse = {
      success: true,
      message: 'Participant cancelled successfully',
      data: {
        participants: null,
        page: 1,
        total: 0,
      },
    };
    return response;
  }
}
