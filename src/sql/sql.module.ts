import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlBook } from './entities/book.entity';
import { SqlAuthor } from './entities/author.entity';
import { SqlBookService } from './sql-book.service';
import { SqlBookController } from './sql-book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SqlBook, SqlAuthor])],
  controllers: [SqlBookController],
  providers: [SqlBookService],
})
export class SqlModule {}
