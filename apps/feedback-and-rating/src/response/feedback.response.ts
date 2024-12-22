export interface IFeedbackResponse {
  success: boolean;
  message: string;
  data: any;
}

export class FeedbackResponse implements IFeedbackResponse {
  success: boolean;
  message: string;
  data: any;

  constructor(success: boolean, message: string, data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
