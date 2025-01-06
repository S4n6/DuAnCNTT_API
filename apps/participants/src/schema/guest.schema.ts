import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Guest extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  email?: string;

  @Prop()
  userId?: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  avatar?: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
