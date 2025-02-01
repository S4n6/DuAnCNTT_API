import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  senderFullName: string;

  @Column()
  senderAvatar: string;

  @Column()
  eventId: string;

  @Column()
  eventName: string;

  @Column()
  senderId: string;

  @Column({ default: 'pending' })
  isAccepted: string;
}
