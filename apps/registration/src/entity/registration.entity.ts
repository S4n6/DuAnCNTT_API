import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column()
  eventId: string;

  @Column()
  registrationDate: Date;

  @Column()
  registrationStatus: string;

  @Column()
  ticketId: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.registration)
  tickets: Ticket;
}
