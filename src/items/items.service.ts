import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './items.entity';
import { CreateItemDto } from './dto/create-items.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private repo: Repository<Item>,
  ) {}

  // ======================
  // SAFE JSON PARSE
  // ======================
  private parse(value: any) {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value || [];
    } catch {
      return [];
    }
  }

  // ======================
  // CREATE SINGLE
  // ======================
 async create(data: CreateItemDto) {
  try {
    const payload = this.buildPayload(data);
    const item = this.repo.create(payload);
    return await this.repo.save(item);
  } catch (err) {
    console.error('CREATE ERROR:', err); // 👈 THIS
    throw err;
  }
}


  // ======================
  // CREATE BULK (FIXED 100%)
  // ======================
  async createMany(dtos: CreateItemDto[]) {
    if (!Array.isArray(dtos) || dtos.length === 0) {
      throw new BadRequestException('No items provided');
    }

    const payload = dtos.map((dto) => this.buildPayload(dto));

    return this.repo.save(this.repo.create(payload));
  }

  // ======================
  // CENTRAL NORMALIZER
  // ======================
  private buildPayload(data: CreateItemDto) {
    return {
      name: data.name ?? 'Unnamed Item',
      image: data.image ?? '',
      level: data.level ?? '1st Level',
      itemType: data.itemType ?? 'consumable',

      stock:
        data.itemType === 'non_consumable' ? 1 : data.stock ?? 1,

      variants: JSON.stringify(data.variants ?? []),

      serials:
        data.itemType === 'consumable'
          ? JSON.stringify([])
          : JSON.stringify(data.serials ?? []),
    };
  }

  // ======================
  // GET ALL
  // ======================
  async findAll() {
    const items = await this.repo.find();

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image || '',
      level: item.level || '1st Level',
      stock: item.stock ?? 0,
      itemType: item.itemType,
      variants: this.parse(item.variants),
      serials: this.parse(item.serials),
    }));
  }

  // ======================
  // GET ONE
  // ======================
  async findOne(id: number) {
    const item = await this.repo.findOneBy({ id });

    if (!item) throw new NotFoundException('Item not found');

    return {
      ...item,
      variants: this.parse(item.variants),
      serials: this.parse(item.serials),
    };
  }

  // ======================
  // DELETE
  // ======================
  async remove(id: number) {
    const res = await this.repo.delete(id);

    if (!res.affected) {
      throw new NotFoundException('Item not found');
    }

    return { message: 'Deleted successfully' };
  }

  // ======================
  // STOCK SYSTEM
  // ======================
  async addStock(id: number, amount: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException();

    await this.repo.update(id, {
      stock: item.stock + amount,
    });

    return this.findOne(id);
  }

  async removeStock(id: number, amount: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException();

    await this.repo.update(id, {
      stock: Math.max(0, item.stock - amount),
    });

    return this.findOne(id);
  }

  // ======================
  // SERIAL SYSTEM
  // ======================
  async addSerial(id: number, serial: string) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException();

    const serials = this.parse(item.serials);

    serials.push({ serial });

    await this.repo.update(id, {
      serials: JSON.stringify(serials),
    });

    return this.findOne(id);
  }

  async removeSerial(id: number, serial: string) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException();

    const serials = this.parse(item.serials);

    const updated = serials.filter((s: { serial: string; }) => s.serial !== serial);

    await this.repo.update(id, {
      serials: JSON.stringify(updated),
    });

    return this.findOne(id);
  }
}