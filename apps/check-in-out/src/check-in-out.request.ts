export interface ICheckInOutRequest {
  fullName: string;
  email: string;
  ticketId: string;
  eventId: string;
  userId: string;
}

export class CheckInOutRequest implements ICheckInOutRequest {
  fullName: string;
  email: string;
  ticketId: string;
  eventId: string;
  userId: string;

  constructor(
    fullName: string,
    email: string,
    ticketId: string,
    eventId: string,
    userId: string,
  ) {
    this.fullName = fullName;
    this.email = email;
    this.ticketId = ticketId;
    this.eventId = eventId;
    this.userId = userId;
  }
}
