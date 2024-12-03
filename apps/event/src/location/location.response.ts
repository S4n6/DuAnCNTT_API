import { Location } from '../entity/location.entity';

export class LocationResponseDto {
  success: boolean;
  message: string;
  data?: Location | Location[];
}
