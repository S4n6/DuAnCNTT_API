import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  speakerId: string;

  @Column()
  eventId: string;

  @Column({ default: 'pending' })
  isAccepted: string;
}
