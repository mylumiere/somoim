import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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
  user_id: string;
  password: string;

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      user_id: new FormControl(''),
      password: new FormControl('')
    })
  }


  onSubmit() {
    console.log(this.signInForm.value)
    this.userService.signIn(this.signInForm.value)
    .subscribe(user => {
      if(user) {
        console.log(user)
        this.router.navigate(['/articles'])
      }
    })
  }
}
