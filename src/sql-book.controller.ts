import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { SqlBookService } from './sql-book.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { SqlBookResponseDto } from './dto/book-response.dto.js';

@Controller('sql/books')
export class SqlBookController {
  constructor(private readonly sqlBookService: SqlBookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<SqlBookResponseDto> {
    const book = await this.sqlBookService.create(createBookDto);
    return SqlBookResponseDto.fromEntity(book);
  }

  @Get()
  async findAll(): Promise<SqlBookResponseDto[]> {
    const books = await this.sqlBookService.findAll();
    return books.map((book) => SqlBookResponseDto.fromEntity(book));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SqlBookResponseDto> {
    const book = await this.sqlBookService.findOne(id);
    return SqlBookResponseDto.fromEntity(book);
  }
}
