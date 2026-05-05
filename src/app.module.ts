import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './chat/chat.entity';
import { Item } from './items/items.entity'; // <-- add Item
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env globally
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '20870'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Message, Item], // <-- include Item and Borrow here
      synchronize: false,
      logging: true, // auto-create tables
      ssl: { rejectUnauthorized: false }, // required for Aiven
    }),
    DatabaseModule,
    ItemsModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}