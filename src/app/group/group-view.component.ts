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

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group, GroupService } from './group.service';

@Component({
  selector: 'app-group-view',
  template: `
    <mat-drawer-container class="drawer-container" autosize>
      <mat-drawer class="drawer" #drawer mode="side" opened>
        <app-group-list></app-group-list>
      </mat-drawer>

      <div class="content">
        <app-document-list *ngIf="group"></app-document-list>
      </div>
    </mat-drawer-container>
  `,
  styles: [
    `
      .drawer-container {
        width: 100vw;
        height: calc(100vh - 64px); // 64px is the height of the toolbar
      }

      .drawer {
        width: 260px;
      }
    `,
  ],
})
export class GroupViewComponent {
  group!: Group;

  constructor(
    protected _route: ActivatedRoute,
    protected _groupService: GroupService
  ) {
    this._route.data.subscribe((data: any) => {
      this.group = data.group as Group;
    });
  }
}
