import { Component} from '@angular/core';
import { User } from './models/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Somoim';
  signedInUserId: string;
  signedInUser: User;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getSignedInUser().subscribe(
      (res) => this.signedInUser = res
    )
    /*
    this.signedInUserId = localStorage.getItem('signedInUserId')
    if (this.signedInUserId) {
      this.userService.getUser(this.signedInUserId).subscribe(
        (res) => this.signedInUser = res
      )
    }
    */
    this.userService.signedIn.subscribe(
      () => this.signedInUser = this.userService.currentUser);
  }

  logOut(): void {
    this.userService.signOut();
    this.signedInUser = null;
    this.router.navigate(['/sign_in'])
  }
}
