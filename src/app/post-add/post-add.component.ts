import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Post } from '../client/client';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostAddComponent implements OnInit {
  constructor(private sevice: PostsService) {}

  ngOnInit() {}

  addPost(): void {
    console.log('adding');
    this.sevice.addPost(
      new Post({
        userId: 1,
        id: 10001,
        title: 'This is a newly added Post',
        body: 'et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut',
      })
    );
  }
}
