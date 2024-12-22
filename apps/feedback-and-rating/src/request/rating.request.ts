import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export interface IRatingRequest {
  eventId: string;
  rating: number;
  comment: string;
  userId: ObjectId;
}

export class RatingRequest implements IRatingRequest {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  userId: ObjectId;
}
