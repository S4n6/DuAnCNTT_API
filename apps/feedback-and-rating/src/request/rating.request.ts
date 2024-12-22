import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export interface IRatingRequest {
  eventId: string;
  rating: number;
  comment: string;
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
}
