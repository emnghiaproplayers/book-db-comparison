import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoSqlBook, NoSqlBookDocument } from './schemas/book.schema.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class NoSqlBookService {
  constructor(
    @InjectModel(NoSqlBook.name)
    private readonly bookModel: Model<NoSqlBookDocument>,
  ) {}

  async create(createDto: CreateBookDto): Promise<NoSqlBookDocument> {
    const title = createDto.title.trim();
    const authorName = createDto.authorName.trim();

    const existing = await this.bookModel.findOne({ title, authorName }).exec();
    if (existing) {
      throw new ConflictException('Book with this title and author already exists in NoSQL');
    }

    const doc = new this.bookModel({
      ...createDto,
      title,
      authorName,
    });
    return doc.save();
  }

  async findAll(tag?: string, metaKey?: string, metaValue?: string): Promise<NoSqlBookDocument[]> {
    const query: any = {};
    if (tag) {
      query.tags = tag;
    }
    if (metaKey && metaValue) {
      query[`metadata.${metaKey}`] = metaValue;
    }
    return this.bookModel.find(query).exec();
  }

  async findOne(id: string): Promise<NoSqlBookDocument> {
    try {
      const book = await this.bookModel.findById(id).exec();
      if (!book) {
        throw new NotFoundException(`NoSQL Book with ID ${id} not found`);
      }
      return book;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new NotFoundException(`Invalid ID or NoSQL Book with ID ${id} not found`);
    }
  }
}
