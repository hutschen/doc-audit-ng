// Copyright (C) 2023 Helmar Hutschenreuter
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { Component, Input } from '@angular/core';
import { QueryResult } from './query.service';

@Component({
  selector: 'app-query-result',
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ queryResult.document.title }}</mat-card-title>
        <mat-card-subtitle>
          <div class="breadcrumb fx-row fx-wrap fx-gap-5">
            <span *ngFor="let header of queryResult.headers">{{ header }}</span>
          </div>
        </mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <div class="content">{{ queryResult.content }}</div>
      </mat-card-content>
      <mat-card-footer>
        <mat-progress-bar
          [value]="scorePercentage"
          matTooltip="{{ scorePercentage }}%"
          color="accent"
        ></mat-progress-bar>
      </mat-card-footer>
    </mat-card>
  `,
  styleUrls: ['../shared/styles/truncate.scss'],
  styles: [
    '.query-result { width: 100%; }',
    '.breadcrumb span:not(:last-child)::after { content: "/"; margin: 0 0.5em; }',
    '.content { white-space: pre-wrap; padding: 1em; }',
  ],
})
export class QueryResultComponent {
  @Input() queryResult!: QueryResult;

  get scorePercentage(): number {
    return Math.round(this.queryResult.score * 100);
  }
}
