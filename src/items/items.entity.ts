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

  // ✅ set default to avoid null
  @Column({ type: 'varchar', length: 50, default: "1st Level" })
  level!: string;

  // ✅ JSON defaults to empty array
  @Column({ type: 'json', nullable: false, default: '[]' })
  variants!: { type: string; stock: number }[];

  @Column({ type: 'json', nullable: false, default: '[]' })
  serials!: { serial: string }[];
}