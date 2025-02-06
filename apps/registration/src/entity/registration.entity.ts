import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name?: string;

  @Column()
  userId: string;

  @Column()
  eventId: string;

  @Column()
  registrationDate: Date;

  @Column()
  registrationStatus: boolean;
}
