import { TypeEvent } from '../entity/typeEvent.entity';

export class TypeEventResponseDto {
  success: boolean;
  message: string;
  data?: TypeEvent | TypeEvent[];
}
