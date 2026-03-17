import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  
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
  create(data: any) {
    const item = this.itemsRepository.create(data);
    return this.itemsRepository.save(item);
  }

  async delete(id: number) {
  return this.itemsRepository.delete(id);
}

}