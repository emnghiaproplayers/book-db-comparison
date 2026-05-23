import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type NoSqlBookDocument = NoSqlBook & Document;

@Schema({ timestamps: true, collection: 'nosql_books' })
export class NoSqlBook {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  metadata: Record<string, any>;
}

export const NoSqlBookSchema = SchemaFactory.createForClass(NoSqlBook);
