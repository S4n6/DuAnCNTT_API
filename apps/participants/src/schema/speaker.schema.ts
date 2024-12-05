import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Speaker extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  eventId?: string;

  @Prop()
  userId?: string;

  @Prop({ required: true })
  bio: string;

  @Prop()
  avatar?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }] })
  events: Types.ObjectId[];
}

export const SpeakerSchema = SchemaFactory.createForClass(Speaker);
