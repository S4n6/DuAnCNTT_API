import {
  IsString,
  IsUUID,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class TicketRequestCreate {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  seatNumber: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsNotEmpty()
  status: boolean;
}
