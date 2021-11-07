import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export default class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true, // needed for self-created users
    type: 'uuid',
  })
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: true, // needed for self-created users
    type: 'uuid',
  })
  lastUpdatedBy: string;
}
