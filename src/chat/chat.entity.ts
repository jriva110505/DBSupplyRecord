import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentId!: string;

  @Column()
  studentName!: string;

  @Column()
  sender!: 'user' | 'admin' | 'system';

  @Column('text')
  text!: string;

  @CreateDateColumn()
  createdAt!: Date;
}