import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { MessageService } from '../message.service';
import { User } from '../models/user';
import { UserService } from '../user.service';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  showingArticles: Article[] = [];
  displayedColumns: string[] = ['id', 'state', 'title', 'writer', 'registered_date', 'hits'];

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.getArticles()
  }

  currentPage = 0;
  pageNum = 2;

  getArticles(): void {
    this.articleService.getArticles()
    .subscribe(articles => this.articles = articles);
  }
}
