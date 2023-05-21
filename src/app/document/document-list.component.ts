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

import { Component, OnDestroy } from '@angular/core';
import { Group } from '../group/group.service';
import { ActivatedRoute } from '@angular/router';
import { GroupInteractionService } from '../group/group-interaction.service';
import { Subject, map, switchMap, takeUntil } from 'rxjs';
import { DataList } from '../shared/data';
import { Document } from './document.service';

@Component({
  selector: 'app-document-list',
  template: `
    <div class="header fx-row">
      <div class="header-content fx-row fx-gap-10">
        <button
          class="icon-button"
          mat-stroked-button
          matTooltip="Edit Group"
          (click)="groupInteractions.onEditGroup(group)"
        >
          <mat-icon class="no-margin">edit</mat-icon>
        </button>
        <button
          class="icon-button"
          mat-stroked-button
          matTooltip="Delete Group"
          (click)="groupInteractions.onDeleteGroup(group)"
        >
          <mat-icon class="no-margin">delete</mat-icon>
        </button>
      </div>
      <mat-divider vertical></mat-divider>
      <div class="header-content">
        <button mat-flat-button color="accent">
          <mat-icon>bolt</mat-icon>
          Query
        </button>
      </div>
    </div>
    <mat-divider></mat-divider>
    <div class="content">
      <app-create-document></app-create-document>
      <div>
        <mat-divider></mat-divider>
        <div *ngFor="let document of reversedDocuments">
          <div class="fx-row fx-gap-10 fx-center-center list-item">
            <div class="fx-grow truncate list-item-title">
              {{ document.title }}
            </div>
            <button mat-stroked-button class="fx-no-grow icon-button">
              <mat-icon class="no-margin">edit</mat-icon>
            </button>
            <button mat-stroked-button class="fx-no-grow icon-button">
              <mat-icon class="no-margin">delete</mat-icon>
            </button>
          </div>
          <mat-divider></mat-divider>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../shared/styles/flex.scss', '../shared/styles/truncate.scss'],
  styles: [
    '.list-item-title { font-size: 16px; }',
    '.list-item { padding: 16px; padding-right: 0px; box-sizing: border-box; }',
    '.content { padding: 16px; box-sizing: border-box; }',
    '.header-content { padding: 16px; box-sizing: border-box; }',
    '.no-margin { margin: 0; }',
    '.icon-button { min-width: 0px; }',
  ],
})
export class DocumentListComponent implements OnDestroy {
  public group!: Group;
  public documents = new DataList<Document>();
  protected _unsubscribeAll = new Subject<void>();

  constructor(
    route: ActivatedRoute,
    readonly groupInteractions: GroupInteractionService
  ) {
    // Get group from route data
    route.data
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((data: any) => data.group as Group),
        switchMap((group: Group) => this.groupInteractions.syncGroup(group))
      )
      .subscribe((group) => (this.group = group));

    // Get documents from route data
    route.data
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((data: any) => data.documents)
      )
      .subscribe((documents) => (this.documents.items = documents));
  }

  get reversedDocuments(): Document[] {
    // To display the documents in reverse order (newest first)
    return this.documents.items.slice().reverse();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
