import { Ticket } from '../entity/ticket.entity';

export class TicketResponse {
  success: boolean;
  message: string;
  data: Ticket | Ticket[];

  constructor(success: boolean, message: string, data: Ticket | Ticket[]) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
