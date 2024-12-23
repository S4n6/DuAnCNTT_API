import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CheckInOutDocument = CheckInOut & Document;

@Schema()
export class CheckInOut {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: false })
  isCheckIn: boolean;

  @Prop()
  checkInTime: Date;

  @Prop()
  checkOutTime: Date;
}

export const CheckInOutSchema = SchemaFactory.createForClass(CheckInOut);
