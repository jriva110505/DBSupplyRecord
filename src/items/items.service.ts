import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

interface Item {
  id: number;
  name: string;
  stock: number;
  level: string;
}

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private idCounter = 1;

  // Get all items
  findAll(): Item[] {
    return this.items;
  }

  // Create item
  create(dto: CreateItemDto): Item {
    const newItem: Item = {
      id: this.idCounter++,
      name: dto.name,
      stock: dto.stock,
      level: dto.level,
    };
    this.items.push(newItem);
    return newItem;
  }

  // Add stock
  addStock(id: number, amount: number): Item {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new NotFoundException('Item not found');
    item.stock += amount;
    return item;
  }

  // Remove stock
  removeStock(id: number, amount: number): Item {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new NotFoundException('Item not found');
    if (item.stock - amount < 0) throw new BadRequestException('Stock cannot be negative');
    item.stock -= amount;
    return item;
  }

  // Delete item
  delete(id: number): { message: string } {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException('Item not found');
    this.items.splice(index, 1);
    return { message: 'Item deleted successfully' };
  }

  
}