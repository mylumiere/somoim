export interface Article {
  id: number;
  title: string;
  members: number[];
  max_members: number;
  content: string;
  writer: string;
  hits: number;
}