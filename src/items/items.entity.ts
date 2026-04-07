import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true, default: "" })
  image!: string;

  @Column({ default: 0 })
  stock!: number;

  @Column({ type: 'varchar', length: 50, default: "1st Level" })
  level!: string;

  @Column({ type: 'json', nullable: true })
  variants!: { type: string; stock: number }[];

  @Column({ type: 'json', nullable: true })
  serials!: { serial: string }[];
}