import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Registration } from './registration.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column()
  eventId: string;

  @Column({ default: false })
  status: boolean;

  @Column()
  userId: string;

  @Column({ type: 'bytea', nullable: true })
  qrCode: Buffer;

  @ManyToOne(() => Registration, (registration) => registration.tickets)
  registration: Registration;
}
