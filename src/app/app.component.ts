import { Component, OnInit, VERSION } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client, Post } from './client/client';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  posts$: Observable<Post[]> | undefined;

  constructor(private client: Client) {}

  ngOnInit(): void {
    this.posts$ = this.client.posts$.pipe(
      map((posts) =>
        posts.map(
          (post) =>
            ({
              ...post,
              title: post?.title?.toUpperCase(),
            } as Post)
        )
      ),
      catchError((e) => {
        this.handleError(e);
        return EMPTY;
      })
    );
  }

  handleError(error: any): void {
    console.error(error);
  }
}
