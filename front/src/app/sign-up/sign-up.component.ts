import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DuplicatedDialogComponent } from './duplicated-dialog/duplicated-dialog.component';
import { UniqueDialogComponent } from './unique-dialog/unique-dialog.component';

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
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  maxDate: Date;

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
      date_of_birth: new FormControl('', [Validators.required]),
      photo: new FormControl(''),
    }, {
      validators: [PasswordConfirmValidator]
    })
  
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 12, 11, 31);
  }



  users: User[] = [];
  dup_user: User;


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
      return '???????????? ???????????????.';
    }
    else if (this.user_id?.hasError('pattern')) {
      return '??????, ???????????? ???????????? 3-15??? ???????????? ???????????????.';
    }
    else if (this.user_id?.hasError('duplicateCheck')) {
      return '??????????????? ??????????????????'
    }
    else return '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return '??????????????? ???????????????.';
    }
    else if (this.password?.hasError('pattern')) {
      return '??????, ??????, ???????????? ????????? ???????????? 8-15??? ??????????????? ???????????????.';
    }
    else return '';
  }

  getPasswordConfirmErrorMessage() {
    if (this.password_confirm?.hasError('required')) {
      return '??????????????? ??????????????????.';
    }
    else if (this.signUpForm.errors.unmatch) {
      this.password_confirm?.setErrors({unmatch: true})
      return '??????????????? ???????????? ????????????.';
    }
    else {
      this.password_confirm?.setErrors({unmatch: false})
      return '';
    }
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return '???????????? ???????????????.';
    }
    else if (this.email?.hasError('email')) {
      return '????????? ????????? ????????????. ???) example@somoim.com';
    }
    else return '';
  }

  getNameErrorMessage() {
    if (this.name?.hasError('required')) {
      return '????????? ???????????????.';
    }
    else return '';
  }

  getDateOfBirthErrorMessage() {
    if (this.date_of_birth?.hasError('required')) {
      return '??????????????? ???????????????.';
    }
    else return '';
  }

  errors: ValidationErrors
  setDuplicateCheck() {
    this.errors = this.user_id?.errors
    if (this.errors) {
      this.errors['duplicateCheck'] = true
    }
    else {
      this.errors = {duplicateCheck:true}
    }
    this.user_id?.setErrors(this.errors);
    return;
  }

  duplicateCheck() {
    this.dup_user = this.users.find(u => u.user_id == this.user_id?.value)
    console.log(this.dup_user)
    if (this.dup_user) {
      this.openDuplicateDialog()
    }
    else {
      this.openUniqueDialog()
      this.user_id?.setErrors({duplicateCheck: false});
      this.user_id?.updateValueAndValidity();
    }
    return
  }

  
  onSubmit() {
    this.userService.postUser(this.signUpForm.value)
    .subscribe(user => {
      if(user) {
        console.log(user)
        this.router.navigate(['/'])
      }
    })
  }

  openDuplicateDialog() {
    this.dialog.open(DuplicatedDialogComponent);
  }
  
  openUniqueDialog() {
    this.dialog.open(UniqueDialogComponent);
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  /*

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const photo = event.target.files[0];
      this.signUpForm.patchValue({
        photo: this.getBase64(photo)
      });
    }
  }

  getBase64(file: File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    return reader.result
 }

 */
}