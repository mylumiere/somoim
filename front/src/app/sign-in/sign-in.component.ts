import { Component, Input, Output, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  signInForm: FormGroup;
  //user_id: string;
  //password: string;
  errorSignIn: string;

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      user_id: new FormControl(''),
      password: new FormControl('')
    })
  }

  get user_id() {
    return this.signInForm.get('user_id');
  }
  get password() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    console.log(this.signInForm.value)
    this.userService.signIn(this.signInForm.value)
    .subscribe(res => {
      if(res) {
        this.router.navigate(['/articles'])
      }
      else {
        this.user_id?.setErrors({invalid:true});
        this.password?.setErrors({invalid:true});
        this.user_id?.updateValueAndValidity;
        this.password?.updateValueAndValidity;
        this.errorSignIn = "존재하지 않는 아이디이거나, 비밀번호가 틀렸습니다.";
      }
    })
  }
}
