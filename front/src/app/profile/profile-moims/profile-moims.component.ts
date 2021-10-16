import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile-moims',
  templateUrl: './profile-moims.component.html',
  styleUrls: ['./profile-moims.component.css']
})
export class ProfileMoimsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getSignedInUser();
    this.getUser();
  }

  signedInUser: User;
  user: User;

  getUser(): void {
    this.userService.getUser(this.route.parent.snapshot.paramMap.get('user_id'))
      .subscribe(user => {
        this.user = user
      });
  }
  
  getSignedInUser(): void {
    this.userService.getSignedInUser().subscribe(
      user => { 
        this.signedInUser = user
        /*
        if (user.leader_moims.length) {
          for(var i = 0; i < user.leader_moims.length; i++){
            if (user.leader_moims[i].schedules.length) {
              this.schedules = [...this.schedules||[],...user.leader_moims[i].schedules||[]]
            }
          }
        }
        if (user.member_moims.length) {
          for(var i = 0; i < user.member_moims.length; i++){
            if (user.member_moims[i].schedules.length) {
              this.schedules = [...this.schedules||[],...user.member_moims[i].schedules||[]]
            }
          }
        }
        */
      }
    )
  }

}
