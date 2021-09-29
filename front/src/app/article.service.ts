import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Article } from './models/article';
import { ARTICLES } from './mock-articles';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  private log(message: string) {
    this.messageService.add(`ArticleService: ${message}`);
  }
  private articlesUrl = 'api/articles';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl)
    .pipe(
      tap(_ => this.log('fetched articles')),
      catchError(this.handleError<Article[]>('getArticles',[]))
      );
  }

  getArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }
}
