import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  userSelectedAction$ = this.service.userSelectedAction$;

  errorMessage$ = this.service.errorMessage$;

  users$ = this.service.users$;
  selectedPost$ = this.service.selectedPost$;

  posts$ = this.service.posts$;

  selection?: number;

  constructor(private service: PostsService) {}

  ngOnInit(): void {}

  onUserSelected(e?: HTMLSelectElement): void {
    let userId = e?.value;
    if (userId) {
      this.service.onUserSelected(+userId);
    }
  }

  onPostSelected(id: number | undefined) {
    if (id != undefined) {
      this.service.onPostSelected(id);
      window.scroll(0, 0);
    }
  }
}
