import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  send(@Body() body: any) {
    return this.chatService.sendMessage(body);
  }

  @Get()
  get(@Query('studentId') studentId: string) {
    return this.chatService.getMessages(studentId);
  }
}