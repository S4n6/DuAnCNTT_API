import { GuestDto } from "./guest.dto";

export class GuestResponse {
  success: boolean;
  message: string;
  data: GuestDto | GuestDto[];

  constructor(
    success: boolean,
    message: string,
    data: GuestDto | GuestDto[],
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}