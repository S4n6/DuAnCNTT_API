// src/user/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DocumentEvent extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ required: true })
  eventId: string;
}

export const DocumentEventSchema = SchemaFactory.createForClass(DocumentEvent);
