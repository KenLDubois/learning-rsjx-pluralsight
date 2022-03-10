import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  VERSION,
} from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  private userSelectedSubject = new BehaviorSubject<number>(-1);
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  users$ = this.service.users$;

  posts$ = combineLatest([
    this.service.postsWithUsersAndComments$,
    this.userSelectedAction$,
  ]).pipe(
    map(([posts, userId]) =>
      posts.filter((post) => {
        return userId && userId > -1 ? post?.userId == userId : true;
      })
    )
  );

  constructor(private service: PostsService) {}

  ngOnInit(): void {
    this.userSelectedSubject.next(-1);
  }

  onUserSelected(e?: HTMLSelectElement): void {
    let userId = e?.value;
    if (userId) {
      this.userSelectedSubject.next(+userId);
    }
  }
}
