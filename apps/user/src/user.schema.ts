// src/user/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TokenDevice } from './tokenDevice.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true })
  phoneNumber?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  avatar?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TokenDevice' }] })
  tokenDevices: TokenDevice[];
}

export const UserSchema = SchemaFactory.createForClass(User);
