import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoSqlBook, NoSqlBookSchema } from './schemas/book.schema';
import { NoSqlBookService } from './nosql-book.service';
import { NoSqlBookController } from './nosql-book.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: NoSqlBook.name, schema: NoSqlBookSchema }])],
  controllers: [NoSqlBookController],
  providers: [NoSqlBookService],
})
export class NoSqlModule {}
