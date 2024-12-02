import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Location } from './location.entity';
import { TypeEvent } from './typeEvent.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  locationId: string;

  @Column()
  description: string;

  @Column()
  typeId: string;

  @ManyToOne(() => Location, (location) => location.events)
  location: Location;

  @ManyToOne(() => TypeEvent, (type) => type.events)
  type: TypeEvent;
}
