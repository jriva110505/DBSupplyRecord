import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private repo: Repository<Message>,
  ) {}

  sendMessage(data: Partial<Message>) {
    return this.repo.save(data);
  }

  getMessages(studentId: string) {
    return this.repo.find({
      where: { studentId },
      order: { createdAt: 'ASC' },
    });
  }
}