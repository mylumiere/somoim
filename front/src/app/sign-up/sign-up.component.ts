import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';

import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user_id = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  password_confirm = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  nickname = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  date_of_birth = new FormControl('', [Validators.required]);
  about = new FormControl('');

  constructor(
    private signUpFormBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  /*
  signUpForm = this.signUpFormBuilder.group({
      user_id: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirm: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      about: new FormControl('')
    })
  */

  ngOnInit(): void {
    this.getUsers()
  }

  users: User[] = []
  status= ''

  getUserIdErrorMessage() {
    if (this.user_id.hasError('required')) {
      return '아이디를 입력하세요.';
    }
    else return '';
  }
  
  signUp(user_id: string, password: string, email: string,
    name: string, nickname: string, date_of_birth: string) {
    this.getUsers()
    this.userService.postUser({
      user_id, password, email, name, nickname, date_of_birth
    } as User)
    .subscribe(user => {
      console.log('no')
      if(user) {
        this.router.navigate(['/'])
      }
    })
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
  
/*
  getArticles(): void {
    this.articleService.getArticles()
        .subscribe(articles => this.articles = articles);
  }

  add(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    if (!title || !content) { return; }
    this.articleService.addArticle({ title, content } as Article)
    .subscribe(article => {
      this.articles.push(article);
    });
  }

  delete(article: Article): void {
    this.articles = this.articles.filter(a => a !== article);
    this.articleService.deleteArticle(article.id).subscribe();
  }
  */
}
