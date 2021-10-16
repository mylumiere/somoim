import { Injectable, EventEmitter, OnInit } from '@angular/core';
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
  private usersUrl = 'api/users/';
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  auth_token = this.getToken()
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, this.httpOptions)
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers',[]))
    )
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions)
    .pipe(
      tap((newUser: User) => {
        console.log(newUser)
        this.log(`added user w/ id=${newUser.user_id}`)}
        ),
      catchError(this.handleError<User>('postUser'))
    );
  }

  currentUser: User
  signedIn: EventEmitter<any> = new EventEmitter<any>();

  signIn(obj): Observable<User> {
    console.log(this.httpOptions)
    return this.http.post<User>(`${this.usersUrl}sign_in/`, 
    obj, this.httpOptions).pipe(
      tap((res: any) => {
        console.log(res);
        localStorage.setItem('auth_token', res.token)
        this.getUser(res.user_id).subscribe((res) => {
          this.currentUser = res;
          this.signedIn.emit(this.currentUser);
          console.log(this.currentUser);
        })
      }),
      catchError(this.handleError<User>('signIn'))
    )
  }

  getToken(): string {
    return localStorage.getItem('auth_token')
  }

  signOut(): void {
    localStorage.removeItem('auth_token')
  }

  getUser(user_id: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}${user_id}/`,this.httpOptions).pipe(
      tap(_ => this.log(`fetched hero id=${user_id}`)),
      catchError(this.handleError<User>(`getUser id=${user_id}`))
    )
  }

  getSignedInUser(): Observable<User> {
    return this.http.get<User>(`api/`,this.httpOptions).pipe(
      tap(res => {
        this.getUser(res.user_id).subscribe(
          user => this.currentUser = user
        )
        this.log(`fetched`)
      }),
      catchError(this.handleError<User>(`getUser`))
    );
  }

  /*

  updateArticle(article: Article): Observable<any> {
    return this.http.put(this.articlesUrl, article, this.httpOptions).pipe(
      tap(_ => this.log(`updated article id=${article.id}`)),
      catchError(this.handleError<any>(`updatedHero`))
    )
  }

*/
}
