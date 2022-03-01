import { Component, OnInit, VERSION } from '@angular/core';
import { EMPTY, from, map, Observable, of, take, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client, Post } from './client/client';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  posts$: Observable<Post[]> | undefined;

  constructor(private client: Client) {}

  ngOnInit(): void {
    this.posts$ = this.client.getPosts().pipe(
      catchError((e) => {
        //throw new Error('uuh oh!')
        this.handleError(e);
        return EMPTY;
      })
    );
  }

  handleError(error: any) {
    console.error(error);
  }
}
