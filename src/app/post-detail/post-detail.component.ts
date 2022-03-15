import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, filter, map } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  // selectedPost$ = this.service.selectedPost$;

  vm$ = combineLatest([
    this.service.selectedPost$,
    this.service.selectedPostComments$,
  ]).pipe(
    filter(([post]) => Boolean(post)),
    map(([post, comments]) => ({
      post,
      comments,
    }))
  );

  constructor(private service: PostsService) {}

  ngOnInit() {}
}
