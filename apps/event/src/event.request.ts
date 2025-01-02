import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class RequestCreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  locationId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  typeId: string;

  @IsString({ each: true })
  images: string[];
}
