export interface ICheckInOutResponse {
  success: boolean;
  message: string;
  data: any;
}

export class CheckInOutResponse implements ICheckInOutResponse {
  success: boolean;
  message: string;
  data: any;

  constructor(success: boolean, message: string, data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
