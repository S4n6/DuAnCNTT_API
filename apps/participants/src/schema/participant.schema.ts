import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Participant extends Document {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  eventId: string;

  @Prop({ type: String, required: true })
  eventName: string;

  @Prop({ type: String, required: true })
  senderId: string;

  @Prop({ type: String, default: 'pending' })
  status: string;

  @Prop({ type: String })
  bio?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, enum: ['speaker', 'guest'], required: true })
  role: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

export const SpeakerSchema = SchemaFactory.createForClass(Participant);
