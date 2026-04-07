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

  const newStock = item.stock + amount;

    await this.repo.update(id, { stock: newStock });

    return this.repo.findOneBy({ id });
}

async removeStock(id: number, amount: number) {
  const item = await this.repo.findOneBy({ id });
  if (!item) return null;

 const newStock = Math.max(0, item.stock - amount);

      await this.repo.update(id, { stock: newStock });

      return this.repo.findOneBy({ id });
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
      id: item.id,
      name: item.name || 'Unnamed Item',
      image: item.image || '',
      level: item.level || '1st Level',
      stock: item.stock ?? 0,
      variants: Array.isArray(item.variants) ? item.variants : [],
      serials: Array.isArray(item.serials) ? item.serials : [],
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