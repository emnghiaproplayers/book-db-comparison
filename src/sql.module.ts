import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlBook } from './entities/book.entity.js';
import { SqlAuthor } from './entities/author.entity.js';
import { SqlBookService } from './sql-book.service.js';
import { SqlBookController } from './sql-book.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SqlBook, SqlAuthor])],
  controllers: [SqlBookController],
  providers: [SqlBookService],
})
export class SqlModule {}
