import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Guest extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  avatar?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Event' }] })
  events: Types.ObjectId[];
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
