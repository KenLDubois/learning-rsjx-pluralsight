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

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [
    AppComponent,
    HelloComponent,
    PostListComponent,
    PostDetailComponent,
    PostAddComponent,
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
