import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-items.dto';

@Controller('items')
export class ItemsController {
  constructor(private service: ItemsService) {}

  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/add-stock')
  addStock(@Param('id') id: number, @Body() body: { amount: number }) {
  return this.service.addStock(+id, body.amount);
}

@Patch(':id/remove-stock')
  removeStock(@Param('id') id: number, @Body() body: { amount: number }) {
  return this.service.removeStock(+id, body.amount);
} 

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}