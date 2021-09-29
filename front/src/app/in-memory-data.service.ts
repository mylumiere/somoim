import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Article } from './models/article';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const articles = [
      { id: 11, title: 'mong', content: 'simong'},
      { id: 12, title: 'I love you', content: 'hehehe'},
      { id: 13, title: 'Bangu', content: 'Bboong'},
      { id: 14, title: 'HwanSeungYeonAe', content: 'Jonjam'},
      { id: 15, title: 'Wingardiu', content: 'Leviousa'},
      { id: 16, title: 'Delicious', content: 'food'},
    ];
    return {articles};
  }

  genId(articles: Article[]): number {
    return articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 11;
  }
}
