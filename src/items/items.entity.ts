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

@Column({
  name: 'item_type', // ✅ MUST match DB
  type: 'enum',
  enum: ['consumable', 'non_consumable'],
  default: 'consumable',
})
itemType!: 'consumable' | 'non_consumable';

@Column({ type: 'text', nullable: true })
variants!: string;

@Column({ type: 'text', nullable: true })
serials!: string;
}