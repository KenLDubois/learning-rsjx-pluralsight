import { Component, OnInit } from '@angular/core';
import { concatMap, from, mergeMap, tap } from 'rxjs';
import { Client } from '../client/client';

@Component({
  selector: 'app-higher-order-mapping',
  templateUrl: './higher-order-mapping.component.html',
  styleUrls: ['./higher-order-mapping.component.css'],
})
export class HigherOrderMappingComponent implements OnInit {
  dealIds = [1, 3, 5];

  posts$ = from(this.dealIds).pipe(
    mergeMap((id) => this.client.getPost(id)),
    tap((x) => console.log(x))
  );

  constructor(private client: Client) {}

  ngOnInit() {
    this.posts$.subscribe();
  }
}
