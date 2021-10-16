import { User } from './user';
import { Schedule } from './schedule';

export interface Moim {
  leader: User;
  name: string;
  members: User[];
  max_members: number;
  content: string;
  schedules: Schedule[];
  registered_date: string;
}