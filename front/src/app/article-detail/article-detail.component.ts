import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../models/article';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from '../article.service';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location        
  ) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(): void {
    this.articleService.getArticle(Number(this.route.snapshot.paramMap.get('id')))
    .subscribe(article => this.article = article);
  }

  save(): void {
    if (this.article) {
      this.articleService.updateArticle(this.article)
      .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  @Input() article?: Article;

}
