import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  seatNumber: string;

  @Column()
  type: string;

  @Column()
  registrationId: string;

  @ManyToOne(() => Registration, (registration) => registration.tickets)
  registration: Registration;
}
