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

  // Send a new message
  async sendMessage(body: {
    studentId: string;
    studentName: string;
    text: string;
    sender: string;
  }) {
    const message = this.messageRepository.create(body);
    return this.messageRepository.save(message);
  }

  // Get messages for one student
  async getMessages(studentId: string) {
    return this.messageRepository.find({
      where: { studentId },
      order: { createdAt: 'ASC' },
    });
  }

  // Get all conversations (Messenger-style)
  async getAllConversations() {
    // Fetch the last message per student
    return this.messageRepository
      .createQueryBuilder('message')
      .select(['message.studentId', 'message.studentName'])
      .addSelect('MAX(message.createdAt)', 'lastMessageAt')
      .groupBy('message.studentId')
      .orderBy('lastMessageAt', 'DESC')
      .getRawMany();
  }
}