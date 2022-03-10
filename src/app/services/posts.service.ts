import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Post, User, Comment, Client } from '../client/client';

@Injectable()
export class PostsService {
  posts$: Observable<Post[]> = this.client.getPosts();
  comments$: Observable<Comment[]> = this.client.getComments();
  users$: Observable<User[]> = this.client.getUsers();

  private postSelectedSubject = new BehaviorSubject<number>(-1);
  postSelectedAction$ = this.postSelectedSubject.asObservable();

  constructor(private client: Client) {}

  postsWithUsersAndComments$ = combineLatest([
    this.posts$,
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
}
