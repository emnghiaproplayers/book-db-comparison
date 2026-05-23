import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SqlBook } from './book.entity';

@Entity('authors')
export class SqlAuthor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => SqlBook, (book) => book.author)
  books: SqlBook[];
}
