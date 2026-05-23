import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoSqlBook, NoSqlBookSchema } from './schemas/book.schema.js';
import { NoSqlBookService } from './nosql-book.service.js';
import { NoSqlBookController } from './nosql-book.controller.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: NoSqlBook.name, schema: NoSqlBookSchema }])],
  controllers: [NoSqlBookController],
  providers: [NoSqlBookService],
})
export class NoSqlModule {}
