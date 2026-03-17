import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  img!: string;

  @Column()
  stock!: number;

  @Column()
  level!: string;

  @Column({ nullable: true })
  variants!: string;
}