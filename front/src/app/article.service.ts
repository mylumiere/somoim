import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Article } from './models/article';
import { ARTICLES } from './mock-articles';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private messageService: MessageService) { }

  getArticles(): Observable<Article[]> {
    const articles = of(ARTICLES);
    this.messageService.add('ArticleService: fetched articles');
    return articles;
  }

  getArticle(id: number): Observable<Article> {
    const article = ARTICLES.find(art => art.id === id)!;
    this.messageService.add(`ArticleService: fetched article id=${id}`);
    return of(article);
  }
}
