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
  signedInUser: User;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.signedIn.subscribe(
      () => this.signedInUser = this.userService.currentUser);
  }

  logout(): void {
    this.userService.signOut();
    this.signedInUser = null;
    this.router.navigate(['/sign_in'])
  }
}
