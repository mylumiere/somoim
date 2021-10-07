import { Component, OnInit } from '@angular/core';

import { Article } from '../models/article';

import { ArticleService } from '../article.service';


import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  articles: Article[] = []
  selectedDate: string;
  signedInUser: User;

  constructor(
    private articleService: ArticleService,
    
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
      articles => this.articles = articles
    )
    this.userService.getSignedInUser().subscribe(
      user => { 
        this.userService.getUser(user.user_id).subscribe(
          user => {
            this.signedInUser = user;
            console.log(user)
          }
        )
      }
    )
    this.userService.signedIn.subscribe(
      () => this.signedInUser = this.userService.currentUser);
  }

  logOut(): void {
    this.userService.signOut();
    this.signedInUser = null;
    this.router.navigate(['/sign_in'])
  }
}
