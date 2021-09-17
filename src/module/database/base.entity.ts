import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
