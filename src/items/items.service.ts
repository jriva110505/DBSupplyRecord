import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
    items: any;
  
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async addStock(id: number, amount: number) {
  const item = await this.itemsRepository.findOne({ where: { id } });

  if (!item) {
    throw new Error('Item not found');
  }

  item.stock += amount;

  return this.itemsRepository.save(item);
}

removeStock(id: number, amount: number) {
  const item = this.items.find((i: { id: number; }) => i.id === id);
  if (!item) throw new NotFoundException('Item not found');
  if (item.stock - amount < 0) throw new BadRequestException('Stock cannot be negative');

  item.stock -= amount;
  return item;
}

  create(data: any) {
    const item = this.itemsRepository.create(data);
    return this.itemsRepository.save(item);
  }

  async delete(id: number) {
  return this.itemsRepository.delete(id);
}

}