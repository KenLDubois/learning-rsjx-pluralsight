import { Component, OnInit } from '@angular/core';
import { concatMap, from, mergeMap, tap, toArray } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Client } from '../client/client';

@Component({
  selector: 'app-higher-order-mapping',
  templateUrl: './higher-order-mapping.component.html',
  styleUrls: ['./higher-order-mapping.component.css'],
})
export class HigherOrderMappingComponent implements OnInit {
  dealIds = [1, 3, 5];

  // NOTE: To preserve original order, use 'concatMap' instead of 'mergeMap'
  posts$ = from(this.dealIds).pipe(
    mergeMap((id) => this.client.getPost(id)),
    toArray()
  );

  constructor(private client: Client) {}

  ngOnInit() {}
}
