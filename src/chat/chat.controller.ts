import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // Send a message
  @Post()
  send(@Body() body: any) {
    return this.chatService.sendMessage(body);
  }

  // Get messages for ONE student
  @Get()
  get(@Query('studentId') studentId: string) {
    if (!studentId) {
      return { error: 'studentId query is required' };
    }
    return this.chatService.getMessages(studentId);
  }

  // Get all conversations
  @Get('all')
  getAll() {
    return this.chatService.getAllConversations();
  }
}