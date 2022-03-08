import { Component, VERSION } from '@angular/core';
import { combineLatest, EMPTY } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Client, Post } from './client/client';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  postsWithComments$ = combineLatest([
    this.client.posts$,
    this.client.comments$,
  ]).pipe(
    map(([posts, comments]) =>
      posts.map(
        (post) =>
          ({
            ...post,
            title: post?.title?.toUpperCase(),
            comments: comments?.filter((c) => {
              return c?.postId && c?.postId == post?.id;
            }),
          } as Post)
      )
    ),
    catchError((e) => {
      this.handleError(e);
      return EMPTY;
    })
  );

  constructor(private client: Client) {}

  handleError(error: any): void {
    console.error(error);
  }
}
