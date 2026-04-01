// chat.controller.ts
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // Send message
  @Post()
  send(@Body() body: any) {
    return this.chatService.sendMessage(body);
  }

  // Get messages for one student
  @Get()
  get(@Query('studentId') studentId: string) {
    if (studentId) {
      return this.chatService.getMessages(studentId);
    }
    // Or return all conversations
    return this.chatService.getAllConversations();
  }

}
