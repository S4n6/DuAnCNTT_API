export interface IRatingResponse {
  success: boolean;
  message: string;
  data: any;
}

export class RatingResponse implements IRatingResponse {
  success: boolean;
  message: string;
  data: any;

  constructor(success: boolean, message: string, data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
