import { IsNotEmpty, IsString } from 'class-validator';

export interface IFeedbackRequest {
  eventId: string;
  surveyLink: string;
}

export class FeedbackRequest implements IFeedbackRequest {
  @IsNotEmpty()
  eventId: string;

  @IsString()
  surveyLink: string;
}
