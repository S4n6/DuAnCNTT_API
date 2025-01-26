import { Ticket } from '../entity/ticket.entity';

export class TicketResponse {
  success: boolean;
  message: string;
  data: {
    tickets: any | any[];
    page?: number;
    total?: number;
  };

  constructor(
    success: boolean,
    message: string,
    data: { tickets: any | any[]; page?: number; total?: number },
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
