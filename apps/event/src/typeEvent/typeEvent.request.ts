import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsInt,
} from 'class-validator';

export class TypeEventRequestDto {
  @IsOptional()
  @IsInt()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;


  constructor(
    name: string,
    id?: string,
    description?: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
