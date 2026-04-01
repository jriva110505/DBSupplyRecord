import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(data: {
    studentId: string;
    studentName: string;
    text: string;
    sender: string;
  }): Promise<Message> {
    const msg = this.messageRepository.create(data);
    return this.messageRepository.save(msg);
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async getMessagesForStudent(studentId: string): Promise<Message[]> {
    return this.messageRepository.find({
      where: { studentId },
      order: { createdAt: 'ASC' },
    });
  }
}