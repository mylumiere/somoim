import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';

import { UserService } from '../user.service';

import { PasswordConfirmValidator } from '../sign-up-validator.directive';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.signUpForm = new FormGroup({
      user_id: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{3,15}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/)
      ]),
      password_confirm: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required])
    }, {
      validators: [PasswordConfirmValidator]
    })
  }

  users: User[] = []


  // Getter Classes
  get user_id() {
    return this.signUpForm.get('user_id');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get password_confirm() {
    return this.signUpForm.get('password_confirm');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get date_of_birth() {
    return this.signUpForm.get('date_of_birth');
  }


  // Error Messages
  getUserIdErrorMessage() {
    if (this.user_id?.hasError('required')) {
      return '아이디를 입력하세요.';
    }
    else if (this.user_id?.hasError('pattern')) {
      return '영문, 숫자로만 이루어진 3-15자 아이디만 가능합니다.';
    }
    else return '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return '패스워드를 입력하세요.';
    }
    else if (this.password?.hasError('pattern')) {
      return '영문, 숫자, 특수문자 모두로 이루어진 8-15자 비밀번호만 가능합니다.';
    }
    else return '';
  }

  getPasswordConfirmErrorMessage() {
    if (this.password_confirm?.hasError('required')) {
      return '패스워드를 확인해주세요.';
    }
    else if (this.signUpForm.errors.unmatch) {
      this.password_confirm?.setErrors({unmatch: true})
      return '패스워드가 일치하지 않습니다.';
    }
    else {
      this.password_confirm?.setErrors({unmatch: false})
      return '';
    }
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return '이메일을 입력하세요.';
    }
    else if (this.email?.hasError('email')) {
      return '올바른 형식이 아닙니다. 예) example@somoim.com';
    }
    else return '';
  }

  getNameErrorMessage() {
    if (this.name?.hasError('required')) {
      return '이름을 입력하세요.';
    }
    else return '';
  }

  getDateOfBirthErrorMessage() {
    if (this.date_of_birth?.hasError('required')) {
      return '생년월일을 입력하세요.';
    }
    else return '';
  }

  /*
  signUp(user_id: string, password: string, email: string,
    name: string, nickname: string, date_of_birth: string) {
    this.getUsers()
    this.userService.postUser({
      user_id, password, email, name, nickname, date_of_birth
    } as User)
    .subscribe(user => {
      if(user) {
        this.router.navigate(['/'])
      }
    })
  }
*/

onSubmit() {
  this.getUsers()
  this.userService.postUser(this.signUpForm.value)
  .subscribe(user => {
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
