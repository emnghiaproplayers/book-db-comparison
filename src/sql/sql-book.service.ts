import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SqlBook } from './entities/book.entity';
import { SqlAuthor } from './entities/author.entity';
import { CreateSqlBookDto } from './dto/create-book.dto';

@Injectable()
export class SqlBookService {
  constructor(
    @InjectRepository(SqlBook)
    private readonly bookRepository: Repository<SqlBook>,
    @InjectRepository(SqlAuthor)
    private readonly authorRepository: Repository<SqlAuthor>,
  ) {}

  async create(createBookDto: CreateSqlBookDto): Promise<SqlBook> {
    const authorName = createBookDto.authorName.trim();
    const title = createBookDto.title.trim();

    let author = await this.authorRepository.findOne({ where: { name: authorName } });
    if (!author) {
      author = this.authorRepository.create({ name: authorName });
      author = await this.authorRepository.save(author);
    }

    const existingBook = await this.bookRepository.findOne({
      where: { title, author: { id: author.id } },
      relations: { author: true },
    });

    if (existingBook) {
      throw new ConflictException('Book with this title and author already exists');
    }

    const book = this.bookRepository.create({
      title,
      author,
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<SqlBook[]> {
    return this.bookRepository.find({ relations: { author: true } });
  }

  async findOne(id: number): Promise<SqlBook> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }
}
