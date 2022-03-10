import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  map,
  merge,
  Observable,
  scan,
  Subject,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post, User, Comment, Client } from '../client/client';

@Injectable()
export class PostsService {
  constructor(private client: Client) {}

  // GET DATA
  private _posts$: Observable<Post[]> = this.client.getPosts();
  comments$: Observable<Comment[]> = this.client.getComments();
  users$: Observable<User[]> = this.client.getUsers();

  // HANDLE USER SELECTION
  private userSelectedSubject = new BehaviorSubject<number>(-1);
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  onUserSelected(userId?: number): void {
    this.userSelectedSubject.next(+userId);
  }

  // HANDLE ERRORS
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  // COMBINE DATA STREAMS
  postsWithUsersAndComments$ = combineLatest([
    this._posts$,
    this.comments$,
    this.users$,
  ]).pipe(
    map(([posts, comments, users]) =>
      posts.map(
        (post) =>
          ({
            ...post,
            user: users?.find((u) => {
              return post?.userId ? u?.id == post.userId : undefined;
            }),
            comments: comments?.filter((c) => {
              return c?.postId && c?.postId == post?.id;
            }),
          } as Post)
      )
    )
  );

  // SELECT POST
  private postSelectedSubject = new BehaviorSubject<number>(-1);
  postSelectedAction$ = this.postSelectedSubject.asObservable();

  onPostSelected(id: number) {
    this.postSelectedSubject.next(id);
  }

  selectedPost$: Observable<Post | undefined> = combineLatest([
    this.postsWithUsersAndComments$,
    this.postSelectedAction$,
  ]).pipe(
    map(([posts, postId]) =>
      posts.find((post) => postId > -1 && post?.id === postId)
    )
  );

  // ADD POST
  private postsAddedSubject = new Subject<Post>();
  postsAddedAction$ = this.postsAddedSubject.asObservable();

  postsAdded$ = merge(
    this.postsWithUsersAndComments$,
    this.postsAddedAction$
  ).pipe(
    scan(
      (acc, value) =>
        value instanceof Array ? [...acc, ...value] : [...acc, value],
      [] as Post[]
    )
  );

  posts$ = combineLatest([
    this.postsWithUsersAndComments$,
    this.userSelectedAction$,
  ]).pipe(
    map(([posts, userId]) =>
      posts.filter((post) => {
        return userId && userId > -1 ? post?.userId == userId : true;
      })
    ),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
}
