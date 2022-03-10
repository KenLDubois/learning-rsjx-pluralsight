import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit {
  selectedPost$ = this.service.selectedPost$;

  constructor(private service: PostsService) {}

  ngOnInit() {}
}
