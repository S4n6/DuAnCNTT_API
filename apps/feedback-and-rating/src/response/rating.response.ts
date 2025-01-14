import { Rating } from '../rating.schema';

export interface IRatingResponse {
  success: boolean;
  message: string;
  data: {
    ratings: Rating | Rating[];
    total: number;
    page: number;
  };
}

export class RatingResponse implements IRatingResponse {
  success: boolean;
  message: string;
  data: {
    ratings: Rating | Rating[];
    total: number;
    page: number;
  };

  constructor(
    success: boolean,
    message: string,
    data: {
      ratings: Rating | Rating[];
      total: number;
      page: number;
    },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
