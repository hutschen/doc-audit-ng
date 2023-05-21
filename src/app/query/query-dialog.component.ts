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

import { Component, Injectable, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Group } from '../group/group.service';
import { QueryResult, QueryService } from './query.service';

@Injectable({
  providedIn: 'root',
})
export class QueryDialogService {
  constructor(protected _dialog: MatDialog) {}

  openQueryDialog(group: Group): MatDialogRef<QueryDialogComponent> {
    return this._dialog.open(QueryDialogComponent, {
      width: '80%',
      data: group,
    });
  }
}

@Component({
  selector: 'app-query-dialog',
  template: `
    <div mat-dialog-content class="fx-column">
      <mat-form-field class="">
        <textarea
          matInput
          [(ngModel)]="query"
          placeholder="Write a sentence, paragraph you want to find in the documents. The search is based on the meaning of your input - not on keywords. Your input can be written in English or German."
          cdkTextareaAutosize="true"
          cdkAutosizeMinRows="3"
        ></textarea>
      </mat-form-field>

      <div class="fx-row fx-gap-10 fx-end">
        <mat-form-field>
          <mat-label>Results</mat-label>
          <mat-select [(ngModel)]="resultsCount" name="resultsCount">
            <mat-option [value]="5">5</mat-option>
            <mat-option [value]="10">10</mat-option>
            <mat-option [value]="25">25</mat-option>
          </mat-select>
        </mat-form-field>
        <button
          mat-flat-button
          color="accent"
          [disabled]="!query"
          class="query-button"
          (click)="onQuery()"
        >
          <mat-icon>bolt</mat-icon>
          Run Query
        </button>
      </div>

      <div class="results">
        <div *ngIf="results">
          <pre *ngFor="let result of results">{{ result | json }}</pre>
          <div></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../shared/styles/flex.scss'],
  styles: [
    '.query-button { height: 56px; }',
    '.fx-end { justify-content: flex-end; }',
  ],
})
export class QueryDialogComponent {
  query: string = '';
  resultsCount: number = 5;
  results: QueryResult[] = [];

  constructor(
    public dialogRef: MatDialogRef<QueryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public group: Group,
    protected _queryService: QueryService
  ) {
    console.log('group', group);
  }

  onQuery() {
    this._queryService
      .queryResults(this.group.id, this.query, this.resultsCount)
      .subscribe((data) => {
        this.results = data as QueryResult[];
      });
  }
}
