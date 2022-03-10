import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  map,
  Subject,
} from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  private userSelectedSubject = new BehaviorSubject<number>(-1);
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  users$ = this.service.users$;
  selectedPost$ = this.service.selectedPost$;

  posts$ = combineLatest([
    this.service.postsWithUsersAndComments$,
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

  constructor(private service: PostsService) {}

  ngOnInit(): void {}

  onUserSelected(e?: HTMLSelectElement): void {
    let userId = e?.value;
    if (userId) {
      this.userSelectedSubject.next(+userId);
    }
  }

  onPostSelected(id: number | undefined) {
    if (id != undefined) {
      this.service.onPostSelected(id);
      window.scroll(0, 0);
    }
  }
}
