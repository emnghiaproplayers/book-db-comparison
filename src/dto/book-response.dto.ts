export class SqlBookResponseDto {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
  } | null;

  static fromEntity(entity: any): SqlBookResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      author: entity.author
        ? {
            id: entity.author.id,
            name: entity.author.name,
          }
        : null,
    };
  }
}

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
