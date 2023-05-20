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
import { Group } from './group.service';
import { Subscription, tap } from 'rxjs';
import { DataList } from '../shared/data';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupInteractionService } from './group-interaction.service';

@Component({
  selector: 'app-group-list',
  template: `
    <div class="button-container">
      <button mat-stroked-button (click)="groupInteractions.onCreateGroup()">
        <mat-icon>add</mat-icon>
        New Group
      </button>
    </div>
    <mat-divider></mat-divider>
    <mat-nav-list class="list-container" *ngIf="groups">
      <mat-list-item
        *ngFor="let group of reversedGroups"
        [class.active]="group.id === activeGroup?.id"
        [routerLink]="['/groups', group.id]"
      >
        {{ group.name }}
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [
    '.button-container { padding: 16px; box-sizing: border-box; }',
    '.list-container { overflow-y: auto; height: calc(100% - 69px); padding: 16px; box-sizing: border-box; }',
    'button {width: 100%; justify-content: left} .active {background-color: #ccc}',
    'mat-list-item {border-radius: 4px}',
    '.active {background-color: rgba(0, 0, 0, 0.20);}',
  ],
})
export class GroupListComponent implements OnDestroy {
  public activeGroup?: Group;
  public groups = new DataList<Group>();
  protected _groupInteractionsSubscription: Subscription;

  constructor(
    route: ActivatedRoute,
    protected _router: Router,
    readonly groupInteractions: GroupInteractionService
  ) {
    route.data.subscribe((data: any) => {
      this.groups.items = data.groups as Group[];
      this.activeGroup = data.group as Group;
    });

    this._groupInteractionsSubscription = this.groups.syncInteractions(
      this.groupInteractions.interactions$.pipe(
        tap((interaction) => {
          if (interaction.action === 'create') {
            this._router.navigate(['/groups', interaction.item.id]);
          }
        })
      )
    );
  }

  get reversedGroups(): Group[] {
    // To display the groups in reverse order (newest first)
    return this.groups.items.slice().reverse();
  }

  ngOnDestroy(): void {
    this._groupInteractionsSubscription.unsubscribe();
  }
}
