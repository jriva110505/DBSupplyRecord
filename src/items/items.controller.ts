import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  // Get all items
  @Get()
  getAllItems() {
    return this.itemsService.findAll();
  }

  // Create new item
  @Post()
  createItem(@Body() body: CreateItemDto) {
    return this.itemsService.create(body);
  }

  // Add stock
  @Patch(':id/add-stock')
  addStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ) {
    return this.itemsService.addStock(id, amount);
  }

  // Remove stock
  @Patch(':id/remove-stock')
  removeStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ) {
    return this.itemsService.removeStock(id, amount);
  }

  // Delete item
  @Delete(':id')
  deleteItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.delete(id);
  }
}