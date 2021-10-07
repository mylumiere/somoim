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

  // For calendar
  days = ['일','월','화','수','목','금','토'];
  arrayDays = [...Array(7).keys()];

  today = new Date();
  year = this.today.getFullYear();
  month = this.today.getMonth()+1;
  numDates = new Date(this.year,this.month,0).getDate();
  firstDay = new Date(this.year,this.month-1,1).getDay();
  firstSunday = 1-this.firstDay;
  numWeeks = Math.ceil((this.numDates-this.firstSunday)/7)+1
  arrayWeeks = [...Array(this.numWeeks).keys()];

  toLastMonth(): void {
    let lastMonth = new Date(this.year, this.month-2);
    this.moveMonth(lastMonth);
  }

  toNextMonth(): void {
    let nextMonth = new Date(this.year, this.month);
    this.moveMonth(nextMonth);
  }

  moveMonth(month): void {
    this.year = month.getFullYear();
    this.month = month.getMonth()+1;
    this.numDates = new Date(this.year,this.month,0).getDate();
    this.firstDay = new Date(this.year,this.month-1,1).getDay();
    this.firstSunday = 1-this.firstDay;
    this.numWeeks = Math.floor((this.numDates-this.firstSunday)/7)+1;
    this.arrayWeeks = [...Array(this.numWeeks).keys()];
  }

}
