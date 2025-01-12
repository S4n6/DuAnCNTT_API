import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResponse } from '../response/ticket.response';
import { TicketRequestCreate } from '../request/ticket.request';

@Controller('/api/tickets/')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  findAll(): Promise<TicketResponse> {
    return this.ticketService.findAll();
  }

  @Get('userId/:userId')
  findByUserId(@Param('userId') userId: string): Promise<TicketResponse> {
    return this.ticketService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TicketResponse> {
    return this.ticketService.findOne(id);
  }

  @Post()
  create(@Body() ticket: TicketRequestCreate): Promise<TicketResponse> {
    return this.ticketService.create(ticket);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() ticket: TicketRequestCreate,
  ): Promise<TicketResponse> {
    return this.ticketService.update(id, ticket);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TicketResponse> {
    return this.ticketService.remove(id);
  }
}
