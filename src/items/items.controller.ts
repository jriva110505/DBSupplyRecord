import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getItems(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Put(':id/stock')
  updateStock(
    @Param('id') id: number,
    @Body('stock') stock: number,
  ): Promise<Item> {
    return this.itemsService.updateStock(id, stock);
  }
}