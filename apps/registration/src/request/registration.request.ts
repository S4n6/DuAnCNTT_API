import { IsString, IsUUID, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class RegistrationRequestCreate {
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  userId: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  registrationDate: Date;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  registrationStatus: string;
}

export class RegistrationRequestCancel {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  ticketId: string;

  @IsNotEmpty()
  eventId: string;
}
