import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entity/ticket.entity';
import { TicketResponse } from '../response/ticket.response';
import { TicketRequestCreate } from '../request/ticket.request';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(page: number, limit: number): Promise<TicketResponse> {
    try {
      const [tickets, total] = await this.ticketRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      if (!tickets.length) {
        return new TicketResponse(false, 'Tickets not found', null);
      }
      return new TicketResponse(true, 'Tickets found', { tickets, total });
    } catch (error) {
      return new TicketResponse(
        false,
        error.message || 'Failed to fetch tickets',
        null,
      );
    }
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<TicketResponse> {
    try {
      const [tickets, total] = await this.ticketRepository.findAndCount({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
      });
      if (!tickets.length) {
        return new TicketResponse(false, 'Tickets not found', null);
      }

      const eventIds = tickets.map((ticket) => ticket.eventId);
      const events = await Promise.all(
        eventIds.map(async (eventId) => {
          try {
            const response = await this.httpService
              .get(`http://localhost:3002/api/events/${eventId}`)
              .toPromise();
            return response.data.data;
          } catch (error) {
            console.error(`Failed to fetch event with id ${eventId}:`, error);
            return null;
          }
        }),
      );

      const eventMap = events.reduce((acc, event) => {
        acc[event.events.id] = event.events;
        return acc;
      }, {});

      const ticketsWithEventInfo = tickets.map((ticket) => ({
        ...ticket,
        event: eventMap[ticket.eventId],
      }));

      return new TicketResponse(true, 'Tickets found', {
        tickets: ticketsWithEventInfo,
        page,
        total,
      });
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
      return new TicketResponse(true, 'Ticket found', { tickets: ticket });
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
      return new TicketResponse(true, 'Ticket created successfully', {
        tickets: newTicket,
      });
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
      return new TicketResponse(true, 'Ticket updated successfully', {
        tickets: updatedTicket,
      });
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
