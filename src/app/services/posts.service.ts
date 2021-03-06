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
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';
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

  // ADD POST
  private postsAddedSubject = new Subject<Post>();
  postsAddedAction$ = this.postsAddedSubject.asObservable();

  addPost(post: Post) {
    this.postsAddedSubject.next(post);
  }

  postsAdded$ = merge(this._posts$, this.postsAddedAction$).pipe(
    scan(
      (acc, value) => (value instanceof Array ? [...value] : [...acc, value]),
      [] as Post[]
    )
  );

  // COMBINE DATA STREAMS
  postsWithUser$ = combineLatest([this.postsAdded$, this.users$]).pipe(
    map(([posts, users]) =>
      posts.map(
        (post) =>
          ({
            ...post,
            user: users?.find((u) => {
              return post?.userId ? u?.id == post.userId : undefined;
            }),
          } as Post)
      )
    )
  );

  posts$ = combineLatest([this.postsWithUser$, this.userSelectedAction$]).pipe(
    map(([posts, userId]) =>
      posts.filter((post) => {
        return userId && userId > -1 ? post?.userId == userId : true;
      })
    ),
    shareReplay(1),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  // SELECT POST
  private postSelectedSubject = new BehaviorSubject<number>(-1);
  postSelectedAction$ = this.postSelectedSubject.asObservable();

  onPostSelected(id: number) {
    this.postSelectedSubject.next(id);
  }

  selectedPost$: Observable<Post | undefined> = combineLatest([
    this.posts$,
    this.postSelectedAction$,
  ]).pipe(
    map(([posts, postId]) =>
      posts.find((post) => postId > -1 && post?.id === postId)
    )
  );

  selectedPostComments$ = combineLatest([
    this.selectedPost$,
    this.comments$,
  ]).pipe(
    map(([post, comments]) =>
      comments.filter((comment) => post && comment?.postId == post?.id)
    )
  );
}
