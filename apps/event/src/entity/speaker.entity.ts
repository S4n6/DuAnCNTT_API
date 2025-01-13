import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  fullName: string;

  @Column()
  avatar: string;

  @Column()
  eventId: string;

  @Column({ default: 'pending' })
  isAccepted: string;
}
