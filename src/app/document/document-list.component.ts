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
import { Subscription, map, switchMap } from 'rxjs';

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
      <p>document-list works!</p>
    </div>
  `,
  styleUrls: ['../shared/styles/flex.scss', '../shared/styles/truncate.scss'],
  styles: [
    '.header-content { padding: 16px; box-sizing: border-box; }',
    '.no-margin { margin: 0; }',
    '.icon-button { min-width: 0px; }',
  ],
})
export class DocumentListComponent implements OnDestroy {
  group!: Group;
  protected _routeDataSubscription: Subscription;

  constructor(
    protected _route: ActivatedRoute,
    readonly groupInteractions: GroupInteractionService
  ) {
    this._routeDataSubscription = this._route.data
      .pipe(
        map((data: any) => data.group as Group),
        switchMap((group: Group) => this.groupInteractions.syncGroup(group))
      )
      .subscribe((group) => (this.group = group));
  }

  ngOnDestroy(): void {
    this._routeDataSubscription.unsubscribe();
  }
}
