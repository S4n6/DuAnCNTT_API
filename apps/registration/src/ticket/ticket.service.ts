import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entity/ticket.entity';
import { TicketResponse } from '../response/ticket.response';
import e from 'express';
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
        return {
          success: false,
          message: 'Tickets not found',
          data: null,
        };
      }
      return {
        success: true,
        message: 'Tickets found',
        data: tickets,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to fetch tickets',
        data: null,
      };
    }
  }

  async findOne(id: string): Promise<TicketResponse> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id } });
      if (!ticket) {
        return {
          success: false,
          message: 'Ticket not found',
          data: null,
        };
      }
      return {
        success: true,
        message: 'Ticket found',
        data: ticket,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to fetch ticket',
        data: null,
      };
    }
  }

  async create(ticket: TicketRequestCreate): Promise<TicketResponse> {
    try {
      const newTicket = await this.ticketRepository.save(ticket);
      return {
        success: true,
        message: 'Ticket created successfully',
        data: newTicket,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create ticket',
        data: null,
      };
    }
  }

  async update(
    id: string,
    ticket: TicketRequestCreate,
  ): Promise<TicketResponse> {
    try {
      await this.ticketRepository.update(id, ticket);
      const updatedTicket = await this.ticketRepository.findOne({
        where: { id },
      });
      if (!updatedTicket) {
        return {
          success: false,
          message: 'Ticket not found after update',
          data: null,
        };
      }
      return {
        success: true,
        message: 'Ticket updated successfully',
        data: updatedTicket,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update ticket',
        data: null,
      };
    }
  }

  async remove(id: string): Promise<TicketResponse> {
    try {
      const ticket = await this.ticketRepository.findOne({ where: { id } });
      if (!ticket) {
        return {
          success: false,
          message: 'Ticket not found',
          data: null,
        };
      }
      await this.ticketRepository.remove(ticket);
      return {
        success: true,
        message: 'Ticket removed successfully',
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to remove ticket',
        data: null,
      };
    }
  }
}
