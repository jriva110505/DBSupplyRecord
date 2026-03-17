import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getAllItems() {
    return this.itemsService.findAll();
  }

  @Post()
  createItem(@Body() body: CreateItemDto) {
    return this.itemsService.create(body);
  }

  @Patch(':id/add-stock')
  addStock(
    @Param('id') id: number,
    @Body('amount') amount: number,
  ) {
    return this.itemsService.addStock(id, amount);
  }

  @Delete(':id')
deleteItem(@Param('id') id: number) {
  return this.itemsService.delete(id);
}

}