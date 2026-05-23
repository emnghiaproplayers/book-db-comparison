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
