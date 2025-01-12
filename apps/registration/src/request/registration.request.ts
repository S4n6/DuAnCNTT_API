import {
  IsString,
  IsUUID,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
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

  @IsOptional()
  name?: string;

  registrationStatus: boolean = true;
}

export class RegistrationRequestCancel {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  eventId: string;
}
