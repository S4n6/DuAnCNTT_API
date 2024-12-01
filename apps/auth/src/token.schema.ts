// src/token/token.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Token extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
