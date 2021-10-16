import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SignInComponent} from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './info/info.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthInverseGuard } from './auth/auth-inverse.guard';
import { ProfileMoimsComponent } from './profile/profile-moims/profile-moims.component';
import { ProfileArticlesComponent } from './profile/profile-articles/profile-articles.component';
import { ProfileSchedulesComponent } from './profile/profile-schedules/profile-schedules.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'sign_in', component: SignInComponent, canActivate: [AuthInverseGuard]},
  { path: 'sign_up', component: SignUpComponent, canActivate: [AuthInverseGuard]},
  { path: 'profile/:user_id', component: ProfileComponent, canActivate: [AuthGuard],
    children: [
      { path: 'moims', component: ProfileMoimsComponent },
      { path: 'articles', component: ProfileArticlesComponent },
      { path: 'schedules', component: ProfileSchedulesComponent }
    ] },
  { path: 'about', component: InfoComponent},
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard]},
  { path: 'articles/:id', component: ArticleDetailComponent, canActivate: [AuthGuard]},

  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
