import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

// For material
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from './date_formats';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    MessagesComponent,
    MainComponent,
    InfoComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),
    // ---------- MaterialModule ------------
    MatNativeDateModule,

    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatSliderModule,

    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    MatNativeDateModule,
    MatDatepickerModule,
    {provide:MAT_DATE_LOCALE, useValue:'ko-KR'},
    {provide:MAT_DATE_FORMATS, useValue:MY_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
