import { Component, OnInit } from '@angular/core';

import { Article } from '../models/article';

import { ArticleService } from '../article.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  articles: Article[] = []

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(
      articles => this.articles = articles
    )
  }

}
