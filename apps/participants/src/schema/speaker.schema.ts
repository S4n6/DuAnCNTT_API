import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Speaker extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  email?: string;

  @Prop()
  userId?: string;

  @Prop({ required: true })
  bio: string;

  @Prop()
  avatar?: string;
}

export const SpeakerSchema = SchemaFactory.createForClass(Speaker);
