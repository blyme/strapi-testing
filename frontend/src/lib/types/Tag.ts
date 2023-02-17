export interface ITag {
  id: number;
  attributes: {
    name: string | null;
    lol: string | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}
