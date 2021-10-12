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
  displayedColumns: string[] = ['id', 'title', 'writer', 'registered_date', 'hits'];

  constructor(
    private articleService: ArticleService,
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


  add(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    if (!title || !content) { return; }
    this.articleService.addArticle({ title, content } as Article)
    .subscribe(article => {
      this.articles.push(article);
    });
  }

  delete(article: Article): void {
    this.articles = this.articles.filter(a => a !== article);
    this.articleService.deleteArticle(article.id).subscribe();
  }
}
