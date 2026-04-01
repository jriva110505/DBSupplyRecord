import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentId!: string;

  @Column()
  studentName!: string;

  @Column()
  text!: string;

  @Column()
  sender!: string;

  @CreateDateColumn()
  createdAt!: Date;
}