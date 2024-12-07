import { Ticket } from '../entity/ticket.entity';

export class TicketResponse {
  success: boolean;
  message: string;
  data: Ticket | Ticket[];
}
