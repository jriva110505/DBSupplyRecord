import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Message } from './chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]) // ✅ THIS LINE FIXES YOUR ERROR
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}