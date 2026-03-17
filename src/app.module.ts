import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module'; // we'll create this next

@Module({
  imports: [DatabaseModule, ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {} 