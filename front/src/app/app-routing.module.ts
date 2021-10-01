import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignInComponent} from './sign-in/sign-in.component'
import { InfoComponent } from './info/info.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'sign_in', component: SignInComponent},
  { path: 'about', component: InfoComponent},
  { path: 'articles', component: ArticlesComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
