import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getSignedInUser();
  }

  signedInUser: User;
  user: User;

  getUser(): void {
    this.userService.getUser(
      this.route.snapshot.paramMap.get('user_id'))
      .subscribe(user => {
        console.log(user)
        this.user = user
      });
  }
  
  getSignedInUser(): void {
    this.userService.getSignedInUser().subscribe(
      user => { 
        this.userService.getUser(user.user_id).subscribe(
          user => this.signedInUser = user
        )
      }
    )
  }
}