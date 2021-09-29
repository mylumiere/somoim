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

  constructor(
    private articleService: ArticleService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {
    this.getArticles()
  }

  getArticles(): void {
    this.articleService.getArticles()
        .subscribe(articles => this.articles = articles);
  }

  add(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    if (!title || !content) { return; }
    this.articleService.addArticle({ title, content } as Article)
    .subscribe(article => {
      this.articles.push(article);
    });
  }
}
