import { Component, OnInit, VERSION } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Client, Post } from './client/client';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  private userSelectedSubject = new BehaviorSubject<number>(-1);
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  users$ = this.client.users$;

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

  posts$ = combineLatest([
    this.postsWithComments$,
    this.userSelectedAction$,
  ]).pipe(
    map(([posts, userId]) =>
      posts.filter((post) => {
        return userId && userId > -1 ? post?.userId == userId : true;
      })
    )
  );

  constructor(private client: Client) {}
  ngOnInit(): void {
    this.userSelectedSubject.next(-1);
  }

  handleError(error: any): void {
    console.error(error);
  }

  onUserSelected(e?: HTMLSelectElement): void {
    let userId = e?.value;
    if (userId) {
      this.userSelectedSubject.next(+userId);
    }
  }
}
