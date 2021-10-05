import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from './models/user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public router: Router,
    ) { }
  
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
  private usersUrl = 'api/users';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers',[]))
    )
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => {
        console.log(newUser)
        this.log(`added user w/ id=${newUser.user_id}`)}
        ),
      catchError(this.handleError<User>('postUser'))
    );
  }

  currentUser: User

  signIn(obj) {
    console.log(obj)
    return this.http.post<User>(`${this.usersUrl}/sign_in/`, 
    obj, this.httpOptions).pipe(
      tap((res: any) => {
        console.log(res)
        console.log(res.token)
        localStorage.setItem('auth_token', res.token)
        this.getUser(res.id).subscribe((res) => {
          this.currentUser = res;
          console.log(this.currentUser)
        })
      })
    )
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}/`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    )
  }

  /*

  getArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  updateArticle(article: Article): Observable<any> {
    return this.http.put(this.articlesUrl, article, this.httpOptions).pipe(
      tap(_ => this.log(`updated article id=${article.id}`)),
      catchError(this.handleError<any>(`updatedHero`))
    )
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.articlesUrl, article, this.httpOptions).pipe(
      tap((newArticle: Article) => this.log(`added article w/ id=${newArticle.id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  deleteArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.delete<Article>(url,this.httpOptions).pipe(
      tap(_ => this.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }
  */
}
