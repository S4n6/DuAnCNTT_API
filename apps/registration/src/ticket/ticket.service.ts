import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entity/ticket.entity';
import { TicketResponse } from '../response/ticket.response';
import { TicketRequestCreate } from '../request/ticket.request';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findAll(): Promise<TicketResponse> {
    try {
      const tickets: Ticket[] = await this.ticketRepository.find();
      if (!tickets) {
        return new TicketResponse(false, 'Tickets not found', null);
      }
      return new TicketResponse(true, 'Tickets found', tickets);
    } catch (error) {
      return new TicketResponse(
        false,
        error.message || 'Failed to fetch tickets',
        null,
      );
    }
  }

  async findOne(id: string): Promise<TicketResponse> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id } });
      if (!ticket) {
        return new TicketResponse(false, 'Ticket not found', null);
      }
      return new TicketResponse(true, 'Ticket found', ticket);
    } catch (error) {
      return new TicketResponse(
        false,
        error.message || 'Failed to fetch ticket',
        null,
      );
    }
  }

  async create(ticket: TicketRequestCreate): Promise<TicketResponse> {
    try {
      const newTicket = await this.ticketRepository.save(ticket);
      return new TicketResponse(true, 'Ticket created successfully', newTicket);
    } catch (error) {
      return new TicketResponse(
        false,
        error.message || 'Failed to create ticket',
        null,
      );
    }
  }

  async update(
    id: string,
    partialTicket: Partial<TicketRequestCreate>,
  ): Promise<TicketResponse> {
    try {
      await this.ticketRepository.update(id, partialTicket);
      const updatedTicket = await this.ticketRepository.findOne({
        where: { id },
      });
      if (!updatedTicket) {
        return new TicketResponse(false, 'Ticket not found after update', null);
      }
      return new TicketResponse(
        true,
        'Ticket updated successfully',
        updatedTicket,
      );
    } catch (error) {
      return new TicketResponse(
        false,
        error.message || 'Failed to update ticket',
        null,
      );
    }
  }

  async remove(id: string): Promise<TicketResponse> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id } });
      if (!ticket) {
        return new TicketResponse(false, 'Ticket not found', null);
      }
      await this.ticketRepository.remove(ticket);
      return new TicketResponse(true, 'Ticket removed successfully', null);
    } catch (error) {
      return new TicketResponse(
        false,
        error.message || 'Failed to remove ticket',
        null,
      );
    }
  }
}
