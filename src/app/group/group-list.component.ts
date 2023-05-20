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

import { Component, OnInit } from '@angular/core';
import { GroupDialogService } from './group-dialog.component';
import { Group, GroupService } from '../shared/services/group.service';
import { firstValueFrom } from 'rxjs';
import { DataList } from '../shared/data';

@Component({
  selector: 'app-group-list',
  template: `
    <div class="button-container">
      <button mat-stroked-button (click)="onCreateGroup()">
        <mat-icon>add</mat-icon>
        New Group
      </button>
    </div>
    <mat-nav-list class="list-container" *ngIf="groups">
      <mat-list-item class="active">Item 1</mat-list-item>
      <mat-list-item *ngFor="let group of groups.items">
        {{ group.name }}
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [
    '.button-container { padding: 16px; box-sizing: border-box; }',
    '.list-container { overflow-y: auto; height: calc(100% - 68px); padding: 16px; box-sizing: border-box; }',
    'button {width: 100%; justify-content: left} .active {background-color: #ccc}',
    'mat-list-item {border-radius: 4px}',
    '.active {background-color: rgba(0, 0, 0, 0.20);}',
  ],
})
export class GroupListComponent implements OnInit {
  // TODO: Use SelectionModel to select a single group
  public groups!: DataList<Group>;

  constructor(
    protected _groupDialogService: GroupDialogService,
    protected _groupService: GroupService
  ) {}

  ngOnInit(): void {
    this._groupService
      .queryGroups()
      .subscribe((groups) => (this.groups = new DataList(groups as Group[])));
  }

  protected async _createOrEditGroup(group?: Group): Promise<void> {
    const dialogRef = this._groupDialogService.openGroupDialog(group);
    const resultingGroup = await firstValueFrom(dialogRef.afterClosed());
    if (resultingGroup) {
      if (group) this.groups.updateItem(resultingGroup);
      else this.groups.addItem(resultingGroup);
    }
  }

  async onCreateGroup(): Promise<void> {
    await this._createOrEditGroup();
  }

  async onEditGroup(group: Group): Promise<void> {
    await this._createOrEditGroup(group);
  }
}
