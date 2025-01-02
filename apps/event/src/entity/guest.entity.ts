import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guestId: string;

  @Column()
  eventId: string;

  @Column({ default: false })
  isAccepted: boolean;
}
