export class NoSqlBookResponseDto {
  id: string;
  title: string;
  author: {
    id: string | null;
    name: string;
  };
  tags: string[];
  metadata: Record<string, any>;

  static fromDocument(doc: any): NoSqlBookResponseDto {
    return {
      id: doc._id.toString(),
      title: doc.title,
      author: {
        id: null,
        name: doc.authorName,
      },
      tags: doc.tags || [],
      metadata: doc.metadata || {},
    };
  }
}
