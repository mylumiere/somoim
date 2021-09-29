import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';

import { ARTICLES } from '../mock-articles';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles = ARTICLES;
  selectedArticle?: Article;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(article: Article): void {
    this.selectedArticle = article;
  }

}
