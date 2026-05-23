import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoSqlBookDocument = NoSqlBook & Document;

@Schema({ timestamps: true, collection: 'nosql_books' })
export class NoSqlBook {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    type: {
      publisher: { type: String, default: 'Unknown' },
      pages: { type: Number, default: 0 },
    },
    default: { publisher: 'Unknown', pages: 0 },
    _id: false,
  })
  metadata: {
    publisher: string;
    pages: number;
    [key: string]: any;
  };
}

export const NoSqlBookSchema = SchemaFactory.createForClass(NoSqlBook);
