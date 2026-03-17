import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
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

  @Patch(':id/remove-stock')
removeStock(
  @Param('id', ParseIntPipe) id: number,
  @Body('amount') amount: number,
) {
  return this.itemsService.removeStock(id, amount);
}

  @Delete(':id')
deleteItem(@Param('id') id: number) {
  return this.itemsService.delete(id);
}

}