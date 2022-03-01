import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, Post } from './client/client';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  posts: Post[] | undefined;

  constructor(private client: Client) {}

  ngOnInit(): void {
    this.client.getPosts().subscribe((x) => {
      this.posts = x;
    });
  }
}
