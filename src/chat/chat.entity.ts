import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentId!: string;

  @Column()
  studentName!: string;

  @Column('text')
  text!: string;

  @Column({ type: 'enum', enum: ['user', 'admin', 'system'] })
  sender!: 'user' | 'admin' | 'system';

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}