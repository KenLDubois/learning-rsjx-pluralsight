import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { API_BASE_URL, Client } from './client/client';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './services/posts.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostAddComponent } from './post-add/post-add.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { HigherOrderMappingComponent } from './higher-order-mapping/higher-order-mapping.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HelloComponent,
    PostListComponent,
    PostDetailComponent,
    PostAddComponent,
    NavComponent,
    HomeComponent,
    HigherOrderMappingComponent
  ],
  providers: [
    Client,
    {
      provide: API_BASE_URL,
      useValue: 'https://jsonplaceholder.typicode.com',
    },
    PostsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
