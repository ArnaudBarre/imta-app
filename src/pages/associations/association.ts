import {Member} from './member';

export class Association {
  name: string;
  description: string;
  members: Array<Member>;
  questions: Array<{ question: string, response: string }>;
  news: Array<{ id: number, title: string, content: string, picture: boolean, date: string }>;
}
