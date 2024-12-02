import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    description: string;

    @Column()
    userId: string;

    @Column()
    status: string;


}