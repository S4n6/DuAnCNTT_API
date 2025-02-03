import { ObjectId } from 'mongoose';

export interface ParticipantDto {
  _id?: ObjectId;

  userId: string;

  senderFullName: string;

  senderAvatar: string;

  eventId: string;

  eventName: string;

  senderId: string;

  status: string;

  bio?: string;

  description?: string;

  role: string;
}
