import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  // ✅ match DB column name
  @Column({ nullable: true })
  image!: string;

  @Column({ default: 0 })
  stock!: number;

   @Column(["1st Level", "2nd Level", "3rd Level", "4th Level", "Others"])
level!: string;

  @Column({ type: 'json', nullable: true })
  variants!: { type: string; stock: number }[];

  @Column({ type: 'json', nullable: true })
  serials!: { serial: string }[];
}