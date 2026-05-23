import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { NoSqlBookService } from './nosql-book.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { NoSqlBookResponseDto } from './dto/book-response.dto.js';

@Controller('nosql/books')
export class NoSqlBookController {
  constructor(private readonly nosqlBookService: NoSqlBookService) {}

  @Post()
  async create(@Body() createDto: CreateBookDto): Promise<NoSqlBookResponseDto> {
    const book = await this.nosqlBookService.create(createDto);
    return NoSqlBookResponseDto.fromDocument(book);
  }

  @Get()
  async findAll(
    @Query('tag') tag?: string,
    @Query('metaKey') metaKey?: string,
    @Query('metaValue') metaValue?: string,
  ): Promise<NoSqlBookResponseDto[]> {
    const books = await this.nosqlBookService.findAll(tag, metaKey, metaValue);
    return books.map((book) => NoSqlBookResponseDto.fromDocument(book));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NoSqlBookResponseDto> {
    const book = await this.nosqlBookService.findOne(id);
    return NoSqlBookResponseDto.fromDocument(book);
  }
}
