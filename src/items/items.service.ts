import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './items.entity';
import { CreateItemDto } from './dto/create-items.dto';

@Injectable()
export class ItemsService {
  async addStock(id: number, amount: number) {
  const item = await this.repo.findOneBy({ id });
  if (!item) return null;

  item.stock += amount;
  return this.repo.save(item);
}

async removeStock(id: number, amount: number) {
  const item = await this.repo.findOneBy({ id });
  if (!item) return null;

  item.stock = Math.max(0, item.stock - amount);
  return this.repo.save(item);
}

  constructor(
    @InjectRepository(Item)
    private repo: Repository<Item>,
  ) {}

  create(data: CreateItemDto) {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  findAll() {
  return this.repo.find().then(items =>
    items.map(item => ({
      ...item,
      variants: item.variants || [],
      serials: item.serials || [],
      stock: item.variants?.length
        ? item.variants.reduce((sum, v) => sum + v.stock, 0)
        : item.stock,
    }))
  );
}



  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}