import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Registration } from './registration.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  seatNumber: string;

  @Column()
  type: string;

  @Column()
  eventId: string;

  @Column({ default: false })
  status: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => Registration, (registration) => registration.tickets)
  registration: Registration;
}
