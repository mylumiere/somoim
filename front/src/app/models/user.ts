import { Article } from './article';

export interface User {
  id: number;
  user_id: string;
  password: string;
  email: string;
  name: string;
  nickname: string;
  date_of_birth: string;
  about: string;
  articles: Article[];
}