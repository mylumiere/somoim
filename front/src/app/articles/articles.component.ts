import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  selectedArticle?: Article;

  constructor(
    private articleService: ArticleService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.getArticles()
  }

  onSelect(article: Article): void {
    this.selectedArticle = article;
    this.messageService.add('MessageComponent: Selected article id='+article.id);
  }

  getArticles(): void {
    this.articleService.getArticles()
        .subscribe(articles => this.articles = articles);
  }

}
