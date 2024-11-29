import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';

export class LoginRequestDto {
  @ValidateIf((o) => !o.phoneNumber)
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsPhoneNumber(null)
  @IsNotEmpty()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
