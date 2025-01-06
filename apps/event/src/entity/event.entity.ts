import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Location } from './location.entity';
import { TypeEvent } from './typeEvent.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  locationId: string;

  @Column()
  ownerId: string;

  @Column()
  description: string;

  @Column('simple-array')
  images: string[];

  @Column({ default: 0 })
  slots: number;

  @Column({ default: 0 })
  price: number;

  @Column()
  typeId: string;

  @Column({ default: false })
  isVerified: boolean;

  @ManyToOne(() => Location, (location) => location.events)
  location: Location;

  @ManyToOne(() => TypeEvent, (type) => type.events)
  type: TypeEvent;
}
