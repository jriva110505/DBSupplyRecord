import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-items.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  // ======================
  // CREATE SINGLE
  // ======================
  @Post()
  create(@Body() dto: CreateItemDto) {
    return this.service.create(dto);
  }

  // ======================
  // CREATE BULK (FIXED SAFE PARSE)
  // ======================
  @Post('bulk')
  createMany(@Body() body: any) {
    // 🔥 ensures array even if frontend sends wrong format
    const dtos = Array.isArray(body) ? body : body?.items;

    return this.service.createMany(dtos ?? []);
  }

  // ======================
  // GET ALL
  // ======================
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ======================
  // GET ONE
  // ======================
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // ======================
  // ADD STOCK
  // ======================
  @Patch(':id/add-stock')
  addStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ) {
    return this.service.addStock(id, amount);
  }

  // ======================
  // REMOVE STOCK
  // ======================
  @Patch(':id/remove-stock')
  removeStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ) {
    return this.service.removeStock(id, amount);
  }

  // ======================
  // ADD SERIAL
  // ======================
  @Patch(':id/add-serial')
  addSerial(
    @Param('id', ParseIntPipe) id: number,
    @Body('serial') serial: string,
  ) {
    return this.service.addSerial(id, serial);
  }

  // ======================
  // REMOVE SERIAL
  // ======================
  @Patch(':id/remove-serial')
  removeSerial(
    @Param('id', ParseIntPipe) id: number,
    @Body('serial') serial: string,
  ) {
    return this.service.removeSerial(id, serial);
  }

  // ======================
  // DELETE
  // ======================
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}