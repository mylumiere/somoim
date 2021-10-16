import { Article } from './article';
import { Moim } from './moim';

export interface User {
  id: number;
  user_id: string;
  password: string;
  email: string;
  name: string;
  nickname: string;
  date_of_birth: string;
  about: string;
  photo: string;
  leader_moims: Moim[];
  member_moims: Moim[];
  articles: Article[];
}