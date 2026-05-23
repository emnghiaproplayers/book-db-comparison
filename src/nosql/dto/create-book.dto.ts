export class CreateNoSqlBookDto {
  title: string;
  authorName: string;
  tags?: string[];
  metadata?: Record<string, any>;
}
