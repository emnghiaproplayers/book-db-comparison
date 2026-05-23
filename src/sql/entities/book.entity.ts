import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { SqlAuthor } from './author.entity';

@Entity('books')
@Unique(['title', 'author'])
export class SqlBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => SqlAuthor, (author) => author.books, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: SqlAuthor;
}
